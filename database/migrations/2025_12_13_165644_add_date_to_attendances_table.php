<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('attendances', function (Blueprint $table) {
            $table->date('date')->after('student_id')->nullable();
            $table->dropUnique(['class_id', 'student_id', 'marked_at']);
            $table->unique(['class_id', 'student_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attendances', function (Blueprint $table) {
            $table->dropUnique(['class_id', 'student_id', 'date']);
            $table->unique(['class_id', 'student_id', 'marked_at']);
            $table->dropColumn('date');
        });
    }
};
