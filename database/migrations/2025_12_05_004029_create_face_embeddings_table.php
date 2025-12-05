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
        Schema::create('face_embeddings', function (Blueprint $table) {
            $table->id();
            $table->string('face_id')->unique()->nullable(); // ID from FastAPI
            $table->integer('student_id')->unique(); // Must match Face ID from FastAPI
            $table->string('name');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->longText('embedding')->nullable(); // Face embedding vector
            $table->json('metadata')->nullable(); // Additional metadata
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('student_id')->references('student_id')->on('student_accounts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('face_embeddings');
    }
};
