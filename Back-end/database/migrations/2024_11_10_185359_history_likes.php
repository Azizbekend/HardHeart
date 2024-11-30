<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('history_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('clickUser')->constrained('users')->onDelete('cascade');
            $table->foreignId('recomUser')->constrained('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('create_educations');
    }
};
