<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\AccountTypeDetail;
use Carbon\Carbon;
class InactiveAccount extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:inactiveaccount';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Change the status of the account when it expires.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $toDate =  Carbon::now();
        
        $accountsActive = AccountTypeDetail::where('status', 'active')->orderBy('user_id')->get();
        foreach ($accountsActive as $key => $account) {
            $end_time = new Carbon($account->end_time);
            $start_time = new Carbon($account->start_time);
            if($end_time->lessThanOrEqualTo($toDate) == true || $start_time->greaterThanOrEqualTo($toDate)){
                $account->update(['status'=>'inactive']);
            }
          
        }

        
    }
}
