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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_id')->constrained('classes')->onDelete('cascade');
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['unknown', 'present', 'late', 'absent']);
            $table->enum('method', ['manual', 'face']);
            $table->timestamp('marked_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->unique(['class_id', 'student_id', 'marked_at']);
            $table->index(['class_id', 'marked_at']);
            $table->index(['student_id', 'marked_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
