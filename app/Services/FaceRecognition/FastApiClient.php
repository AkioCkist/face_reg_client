<?php

namespace App\Services\FaceRecognition;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class FastApiClient
{
    private Client $client;
    private string $baseUrl;
    private array $authConfig;

    public function __construct()
    {
        $this->baseUrl = config('api.fastapi.base_url');
        $this->authConfig = config('api.fastapi.auth');

        $this->client = new Client([
            'base_uri' => $this->baseUrl,
            'timeout' => config('api.fastapi.timeout'),
            'connect_timeout' => config('api.fastapi.connect_timeout'),
            'headers' => $this->getDefaultHeaders(),
        ]);
    }

    /**
     * Get default headers for requests
     */
    private function getDefaultHeaders(): array
    {
        $headers = [
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ];

        // Add authentication headers based on config
        if ($this->authConfig['type'] === 'bearer' && !empty($this->authConfig['token'])) {
            $headers['Authorization'] = 'Bearer ' . $this->authConfig['token'];
        } elseif ($this->authConfig['type'] === 'api_key' && !empty($this->authConfig['token'])) {
            $headers[$this->authConfig['api_key_header']] = $this->authConfig['token'];
        }

        return $headers;
    }

    /**
     * Make a GET request
     */
    public function get(string $endpoint, array $params = []): array
    {
        return $this->request('GET', $endpoint, [
            'query' => $params,
        ]);
    }

    /**
     * Make a POST request
     */
    public function post(string $endpoint, array $data = []): array
    {
        return $this->request('POST', $endpoint, [
            'json' => $data,
        ]);
    }

    /**
     * Make a PUT request
     */
    public function put(string $endpoint, array $data = []): array
    {
        return $this->request('PUT', $endpoint, [
            'json' => $data,
        ]);
    }

    /**
     * Make a DELETE request
     */
    public function delete(string $endpoint): array
    {
        return $this->request('DELETE', $endpoint);
    }

    /**
     * Make a request with retry logic
     */
    private function request(string $method, string $endpoint, array $options = []): array
    {
        $retryTimes = config('api.fastapi.retry_times');
        $retryDelay = config('api.fastapi.retry_delay');
        $lastException = null;

        for ($attempt = 0; $attempt < $retryTimes; $attempt++) {
            try {
                $response = $this->client->request($method, $endpoint, $options);
                $body = $response->getBody()->getContents();

                return [
                    'success' => true,
                    'data' => json_decode($body, true),
                    'status_code' => $response->getStatusCode(),
                ];
            } catch (GuzzleException $e) {
                $lastException = $e;

                Log::warning("FastAPI request failed (attempt {$attempt}/{$retryTimes})", [
                    'method' => $method,
                    'endpoint' => $endpoint,
                    'error' => $e->getMessage(),
                ]);

                // Don't retry on client errors (4xx)
                if ($e->getCode() >= 400 && $e->getCode() < 500) {
                    break;
                }

                // Wait before retrying
                if ($attempt < $retryTimes - 1) {
                    usleep($retryDelay * 1000);
                }
            }
        }

        // All retries failed
        Log::error('FastAPI request failed after all retries', [
            'method' => $method,
            'endpoint' => $endpoint,
            'error' => $lastException?->getMessage(),
        ]);

        return [
            'success' => false,
            'error' => $lastException?->getMessage() ?? 'Unknown error',
            'status_code' => $lastException?->getCode() ?? 500,
        ];
    }

    /**
     * Check API health
     */
    public function checkHealth(): bool
    {
        try {
            $response = $this->get(config('api.fastapi.endpoints.health'));
            return $response['success'] ?? false;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Build endpoint URL with parameters
     */
    public function buildEndpoint(string $template, array $params = []): string
    {
        $endpoint = $template;

        foreach ($params as $key => $value) {
            $endpoint = str_replace("{{$key}}", $value, $endpoint);
        }

        return $endpoint;
    }
}
