<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('complaint', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user_to')->constrained('users')->onDelete('cascade');
            $table->foreignId('id_user_from')->constrained('users')->onDelete('cascade');
            $table->text('reason');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('complaint');
    }
};
