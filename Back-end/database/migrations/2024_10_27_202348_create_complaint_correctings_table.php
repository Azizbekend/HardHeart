<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('complaint_correcting', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->timestamp('time')->useCurrent();
            $table->text('reason');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('complaint_correcting');
    }
};
