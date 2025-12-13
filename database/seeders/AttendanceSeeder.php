<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\ClassModel;
use App\Models\Attendance;
use Illuminate\Database\Seeder;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create teacher users
        $teacher1 = User::factory()->create([
            'name' => 'Nguyễn Văn A (Giáo Viên)',
            'email' => 'teacher1@example.com',
            'role' => 'teacher',
            'password' => bcrypt('password'),
        ]);

        $teacher2 = User::factory()->create([
            'name' => 'Trần Thị B (Giáo Viên)',
            'email' => 'teacher2@example.com',
            'role' => 'teacher',
            'password' => bcrypt('password'),
        ]);

        // Create student users
        $students = [];
        for ($i = 1; $i <= 30; $i++) {
            $students[] = User::factory()->create([
                'name' => "Học Sinh $i",
                'email' => "student$i@example.com",
                'role' => 'student',
                'student_id' => str_pad($i, 5, '0', STR_PAD_LEFT),
                'password' => bcrypt('password'),
            ]);
        }

        // Create classes
        $class1 = ClassModel::create([
            'teacher_id' => $teacher1->id,
            'name' => 'Lớp 12A1',
            'code' => '12A1',
            'description' => 'Lớp 12 Toán chuyên',
            'room' => '301',
            'day_of_week' => 'Monday',
            'start_time' => '07:00',
            'end_time' => '08:30',
        ]);

        $class2 = ClassModel::create([
            'teacher_id' => $teacher1->id,
            'name' => 'Lớp 12A2',
            'code' => '12A2',
            'description' => 'Lớp 12 Lý chuyên',
            'room' => '302',
            'day_of_week' => 'Tuesday',
            'start_time' => '08:45',
            'end_time' => '10:15',
        ]);

        $class3 = ClassModel::create([
            'teacher_id' => $teacher2->id,
            'name' => 'Lớp 12B1',
            'code' => '12B1',
            'description' => 'Lớp 12 Tiếng Anh chuyên',
            'room' => '401',
            'day_of_week' => 'Wednesday',
            'start_time' => '10:30',
            'end_time' => '12:00',
        ]);

        // Attach students to classes
        $class1->students()->attach(array_slice(array_map(fn($s) => $s->id, $students), 0, 15));
        $class2->students()->attach(array_slice(array_map(fn($s) => $s->id, $students), 5, 15));
        $class3->students()->attach(array_slice(array_map(fn($s) => $s->id, $students), 15, 15));

        // Create attendance records for the last 10 days
        $statuses = ['present', 'late', 'absent'];
        $methods = ['manual', 'face'];

        for ($day = 0; $day < 10; $day++) {
            $date = now()->subDays($day)->startOfDay();

            foreach ($class1->students as $student) {
                Attendance::create([
                    'class_id' => $class1->id,
                    'student_id' => $student->id,
                    'status' => $statuses[array_rand($statuses)],
                    'method' => $methods[array_rand($methods)],
                    'marked_at' => $date,
                    'notes' => rand(0, 1) ? 'Ghi chú mẫu' : null,
                ]);
            }

            foreach ($class2->students as $student) {
                Attendance::create([
                    'class_id' => $class2->id,
                    'student_id' => $student->id,
                    'status' => $statuses[array_rand($statuses)],
                    'method' => $methods[array_rand($methods)],
                    'marked_at' => $date,
                    'notes' => rand(0, 1) ? 'Ghi chú mẫu' : null,
                ]);
            }
        }

        $this->command->info('Attendance data seeded successfully!');
    }
}
