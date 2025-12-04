<?php

namespace Database\Seeders;

use App\Models\StudentAccount;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentAccountSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $students = [
            [
                'student_id' => 1001,
                'name' => 'John Doe',
                'email' => 'john.doe@university.edu',
                'phone' => '+1234567890',
                'department' => 'Computer Science',
                'academic_year' => 2024,
                'is_active' => true,
            ],
            [
                'student_id' => 1002,
                'name' => 'Jane Smith',
                'email' => 'jane.smith@university.edu',
                'phone' => '+1234567891',
                'department' => 'Mathematics',
                'academic_year' => 2024,
                'is_active' => true,
            ],
            [
                'student_id' => 1003,
                'name' => 'Bob Johnson',
                'email' => 'bob.johnson@university.edu',
                'phone' => '+1234567892',
                'department' => 'Physics',
                'academic_year' => 2023,
                'is_active' => true,
            ],
            [
                'student_id' => 1004,
                'name' => 'Alice Brown',
                'email' => 'alice.brown@university.edu',
                'phone' => '+1234567893',
                'department' => 'Computer Science',
                'academic_year' => 2024,
                'is_active' => true,
            ],
            [
                'student_id' => 1005,
                'name' => 'Charlie Wilson',
                'email' => 'charlie.wilson@university.edu',
                'phone' => '+1234567894',
                'department' => 'Engineering',
                'academic_year' => 2023,
                'is_active' => true,
            ],
        ];

        foreach ($students as $student) {
            StudentAccount::create($student);
        }
    }
}
