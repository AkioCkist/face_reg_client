<?php

namespace App\Console\Commands;

use App\Models\Face;
use Illuminate\Console\Command;

class SyncFacesFromFastAPI extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'faces:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync face embeddings from FastAPI backend to local database';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Starting face synchronization from FastAPI...');

        $result = Face::syncFromFastAPI();

        if ($result['success']) {
            $this->info("Successfully synced {$result['synced']} faces from FastAPI.");
            return self::SUCCESS;
        }

        $this->error("Failed to sync faces: {$result['error']}");
        return self::FAILURE;
    }
}
