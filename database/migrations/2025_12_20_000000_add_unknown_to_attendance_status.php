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
        // Drop the existing check constraint and recreate it with 'unknown' added
        if (DB::connection()->getDriverName() === 'pgsql') {
            // Drop the old constraint
            DB::statement("ALTER TABLE attendances DROP CONSTRAINT attendances_status_check");
            // Add new constraint with 'unknown'
            DB::statement("ALTER TABLE attendances ADD CONSTRAINT attendances_status_check CHECK (status IN ('unknown', 'present', 'late', 'absent'))");
        } else {
            // For MySQL, recreate the enum
            Schema::table('attendances', function (Blueprint $table) {
                $table->enum('status', ['unknown', 'present', 'late', 'absent'])->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // For PostgreSQL, drop and recreate without unknown
        if (DB::connection()->getDriverName() === 'pgsql') {
            DB::statement("ALTER TABLE attendances DROP CONSTRAINT attendances_status_check");
            DB::statement("ALTER TABLE attendances ADD CONSTRAINT attendances_status_check CHECK (status IN ('present', 'late', 'absent'))");
        } else {
            // For MySQL, recreate without unknown
            Schema::table('attendances', function (Blueprint $table) {
                $table->enum('status', ['present', 'late', 'absent'])->change();
            });
        }
    }
};
