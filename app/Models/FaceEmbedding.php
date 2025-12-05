<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FaceEmbedding extends Model
{
    protected $table = 'face_embeddings';
    
    protected $primaryKey = 'id';
    
    protected $keyType = 'string';
    
    public $incrementing = false;
    
    public $timestamps = false;

    protected $fillable = [
        'id',
        'embedding',
    ];

    protected $casts = [
        'embedding' => 'array',
    ];
}
