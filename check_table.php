<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Get table columns
$columns = \DB::select("
    SELECT column_name, data_type, is_nullable 
    FROM information_schema.columns 
    WHERE table_name='face_embeddings' 
    ORDER BY ordinal_position
");

echo "=== face_embeddings Table Structure ===\n";
foreach ($columns as $col) {
    echo "{$col->column_name} ({$col->data_type}) - Nullable: {$col->is_nullable}\n";
}

// Get sample data count
$count = \DB::table('face_embeddings')->count();
echo "\nTotal records: $count\n";

// Get sample record
$sample = \DB::table('face_embeddings')->first();
if ($sample) {
    echo "\nSample record:\n";
    echo json_encode($sample, JSON_PRETTY_PRINT);
}
