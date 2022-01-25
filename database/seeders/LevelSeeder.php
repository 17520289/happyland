<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
Use App\Models\Level;
class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('levels')->delete();
        DB::beginTransaction();
        try {
            $level1 = Level::create([
                'name'=> 'Level 1',
                'description'=> 'Level 1'
            ]);
            $level2 = Level::create([
                'name'=> 'Level 2',
                'description'=> 'Level 2'
            ]);
            $level3 = Level::create([
                'name'=> 'Level 3',
                'description'=> 'Level 3'
            ]);
            
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            
            throw new Exception($e->getMessage());
        }
    }
}
