<?php

namespace Database\Seeders;

use App\Models\StudentAccount;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReseedStudentAccountsSeeder extends Seeder
{
    /**
     * Run the database seeder to create student accounts from face embeddings table.
     */
    public function run(): void
    {
        try {
            // Get all face embeddings
            $faceEmbeddings = DB::table('face_embeddings')->get();
            
            $this->command->info("Found " . count($faceEmbeddings) . " face embeddings");
            
            foreach ($faceEmbeddings as $embedding) {
                // Use the face embedding id as student_id
                $studentId = (int) $embedding->id;
                
                // Extract name and email from embedding if available, or generate defaults
                $name = $embedding->name ?? $embedding->account_id ?? "Student {$studentId}";
                $email = $embedding->email ?? "student{$studentId}@university.edu";
                
                // Create or update student account
                StudentAccount::updateOrCreate(
                    ['student_id' => $studentId],
                    [
                        'name' => $name,
                        'email' => $email,
                        'department' => $embedding->department ?? null,
                        'is_active' => true,
                    ]
                );
            }
            
            $this->command->info('Successfully created ' . count($faceEmbeddings) . ' student accounts from face embeddings.');
        } catch (\Exception $e) {
            $this->command->error('Error creating student accounts: ' . $e->getMessage());
        }
    }
}
