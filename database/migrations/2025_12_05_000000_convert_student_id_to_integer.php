<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('student_accounts', function (Blueprint $table) {
            // Convert student_id from string to integer
            // First, drop the unique constraint if it exists
            $table->dropUnique(['student_id']);
        });

        // Now modify the column to be a regular integer instead of unsignedBigInteger
        Schema::table('student_accounts', function (Blueprint $table) {
            $table->integer('student_id')->change();
            $table->unique('student_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('student_accounts', function (Blueprint $table) {
            $table->dropUnique(['student_id']);
        });

        // Revert to unsignedBigInteger
        Schema::table('student_accounts', function (Blueprint $table) {
            $table->unsignedBigInteger('student_id')->change();
            $table->unique('student_id');
        });
    }
};
