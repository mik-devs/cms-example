<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('achievements', function (Blueprint $table) {
            $table->string('image')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        throw_if(
            DB::table('achievements')->whereNull('image')->exists(),
            'RuntimeException',
            'Cannot make achievements.image required while records without images exist.',
        );

        Schema::table('achievements', function (Blueprint $table) {
            $table->string('image')->nullable(false)->change();
        });
    }
};
