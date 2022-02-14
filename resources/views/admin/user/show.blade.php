@extends(backpack_view('blank'))

@php
$defaultBreadcrumbs = [
    'Teacher' => backpack_url('dashboard'),
    'List Student' => route('course.list-student', ['id'=>$course->id]),
    'Show Student' => false,
];

// if breadcrumbs aren't defined in the CrudController, use the default breadcrumbs
$breadcrumbs = $breadcrumbs ?? $defaultBreadcrumbs;
@endphp
@section('after_styles')
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>
        .account-settings .user-profile {
            margin: 0 0 1rem 0;
            padding-bottom: 1rem;
            text-align: center;
        }

        .account-settings .user-profile .user-avatar {
            margin: 0 0 1rem 0;
        }

        .account-settings .user-profile .user-avatar img {
            width: 90px;
            height: 90px;
            -webkit-border-radius: 100px;
            -moz-border-radius: 100px;
            border-radius: 100px;
        }

        .account-settings .user-profile h5.user-name {
            margin: 0 0 0.5rem 0;
        }

        .account-settings .user-profile h6.user-email {
            margin: 0;
            font-size: 0.8rem;
            font-weight: 400;
            color: #9fa8b9;
        }

        .account-settings .about {
            margin: 2rem 0 0 0;
            text-align: center;
        }

        .account-settings .about h5 {
            margin: 0 0 15px 0;
            color: #007ae1;
        }

        .account-settings .about p {
            font-size: 0.825rem;
        }

        .form-control {
            border: 1px solid #cfd1d8;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            font-size: .825rem;
            background: #ffffff;
            color: #2e323c;
        }

        .card {
            background: #ffffff;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            border: 0;
            margin-bottom: 1rem;
        }

    </style>
@endsection
@section('content')

    <div class="row gutters">
        <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
                <div class="card-body">
                    <div class="account-settings">
                        <div class="user-profile">
                            <div class="user-avatar">
                                <img src="{{$student->image !=null ? asset($student->image) : asset('images/avatar.png')}}" alt="Maxwell Admin">
                            </div>
                            <h5 class="user-name">{{$student->full_name}}</h5>
                            <h6 class="user-email">{{$student->email}}</h6>
                        </div>
                        <div class="about">
                            <h5>About</h5>
                            <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human
                                experiences.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
                <div class="card-body">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                          <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Student</button>
                          <button class="nav-link" id="nav-course-tab" data-bs-toggle="tab" data-bs-target="#nav-course" type="button" role="tab" aria-controls="nav-course" aria-selected="false">Parent</button>
                          <button class="nav-link" id="nav-grades-tab" data-bs-toggle="tab" data-bs-target="#nav-grades" type="button" role="tab" aria-controls="nav-grades" aria-selected="false">Grades</button>
                        </div>
                      </nav>
                     
                      <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 class="mb-2 text-primary">Student Details</h6>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="fullName">First Name</label>
                                        <p class="form-control">{{$student->name ?? 'Name'}}</p>
                                        {{-- <input type="text" class="form-control" id="fullName" placeholder="Enter full name"> --}}
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="fullName">Last Name</label>
                                        <p class="form-control">{{$student->full_name ?? 'Full Name'}}</p>
                                        {{-- <input type="text" class="form-control" id="fullName" placeholder="Enter full name"> --}}
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="eMail">Email</label>
                                        <p class="form-control">{{$student->email }}</p>
                                        {{-- <input type="email" class="form-control" id="eMail" placeholder="Enter email ID"> --}}
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="phone">Phone</label>
                                        <p class="form-control">{{$student->phone ?? 'Phone'}}</p>
                                        {{-- <input type="text" class="form-control" id="phone" placeholder="Enter phone number"> --}}
                                    </div>
                                </div>
                               
                            </div>
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 class="mt-3 mb-2 text-primary">Address</h6>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="Street">Street</label>
                                        <p class="form-control">{{$student->address->street ?? 'Street'}}</p>
                                        {{-- <input type="name" class="form-control" id="Street" placeholder="Enter Street"> --}}
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="ciTy">City</label>
                                        <p class="form-control">{{$student->address->city ?? 'City'}}</p>
                                        {{-- <input type="name" class="form-control" id="ciTy" placeholder="Enter City"> --}}
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="sTate">State</label>
                                        <p class="form-control">{{$student->address->state ?? 'State'}}</p>
                                        {{-- <input type="text" class="form-control" id="sTate" placeholder="Enter State"> --}}
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="zIp">Postal Code</label>
                                        <p class="form-control">{{$student->address->postal_code ?? 'Postal code'}}</p>
                                        {{-- <input type="text" class="form-control" id="zIp" placeholder="Zip Code"> --}}
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="zIp">Country</label>
                                        <p class="form-control">{{$student->address->country ?? 'Country'}}</p>
                                        {{-- <input type="text" class="form-control" id="zIp" placeholder="Zip Code"> --}}
                                    </div>
                                </div>
                            </div>
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="text-right"> 
                                       <a href="{{route('course.list-student', ['id'=>$course->id])}}"> <button type="button" name="submit" class="btn btn-primary">Back</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="nav-course" role="tabpanel" aria-labelledby="nav-course-tab">
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 class="mb-2 text-primary">Parent Details</h6>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="fullName">First Name</label>
                                        <p class="form-control">{{$parent->name ?? 'Name'}}</p>
                                        {{-- <input type="text" class="form-control" id="fullName" placeholder="Enter full name"> --}}
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="fullName">Last Name</label>
                                        <p class="form-control">{{$parent->full_name ?? 'Full Name'}}</p>
                                        {{-- <input type="text" class="form-control" id="fullName" placeholder="Enter full name"> --}}
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="eMail">Email</label>
                                        <p class="form-control">{{$parent->email ?? 'Email' }}</p>
                                        {{-- <input type="email" class="form-control" id="eMail" placeholder="Enter email ID"> --}}
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="phone">Phone</label>
                                        <p class="form-control">{{$parent->phone ?? 'Phone'}}</p>
                                        {{-- <input type="text" class="form-control" id="phone" placeholder="Enter phone number"> --}}
                                    </div>
                                </div>
                               
                            </div>
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 class="mt-3 mb-2 text-primary">Address</h6>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="Street">Street</label>
                                        <p class="form-control">{{$parent->address->street ?? 'Street'}}</p>
                                        {{-- <input type="name" class="form-control" id="Street" placeholder="Enter Street"> --}}
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="ciTy">City</label>
                                        <p class="form-control">{{$parent->address->city ?? 'City'}}</p>
                                        {{-- <input type="name" class="form-control" id="ciTy" placeholder="Enter City"> --}}
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="sTate">State</label>
                                        <p class="form-control">{{$parent->address->state ?? 'State'}}</p>
                                        {{-- <input type="text" class="form-control" id="sTate" placeholder="Enter State"> --}}
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="zIp">Postal Code</label>
                                        <p class="form-control">{{$parent->address->postal_code ?? 'Postal code'}}</p>
                                        {{-- <input type="text" class="form-control" id="zIp" placeholder="Zip Code"> --}}
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="zIp">Country</label>
                                        <p class="form-control">{{$parent->address->country ?? 'Country'}}</p>
                                        {{-- <input type="text" class="form-control" id="zIp" placeholder="Zip Code"> --}}
                                    </div>
                                </div>
                            </div>
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="text-right"> 
                                       <a href="{{route('course.list-student', ['id'=>$course->id])}}"> <button type="button" name="submit" class="btn btn-primary">Back</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="nav-grades" role="tabpanel" aria-labelledby="nav-grades-tab">
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 class="mb-2 text-primary">Grades: </h6>
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <table class="table table-responsive-sm table-sm table-grades">
                                        <thead>
                                          <tr>
                                            <th scope="col">#Column </th>
                                            <th scope="col">Scores</th>
                                            <th scope="col">Comment</th>
                                            <th scope="col">Classification</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                           
                                            @foreach ($columnScores as $column)
                                            @php
                                                $grade = \App\Models\Grade::where('user_id', $student->id)->where('column_score_id', $column->id)->first();
                                            @endphp
                                            <tr>
                                                <td ><b>{{$column->name}}</b></td>
                                                <td >{{ $grade->scores ?? '...'}}</td>
                                                <td style="word-wrap: break-word;  max-width: 150px;padding-right: 30px">{{ $grade->comment ?? '...'}}</td>
                                                <td  >{{ $grade->classification ?? '...'}}</td>
                                              </tr>
                                            @endforeach
                                     
                                        </tbody>
                                      </table>
                                </div>
                             
                            </div>
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="text-right"> 
                                       <a href="{{route('course.list-student', ['id'=>$course->id])}}"> <button type="button" name="submit" class="btn btn-primary">Back</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                   
                </div>
            </div>
        </div>
    </div>
 


@endsection
@section('after_scripts')
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
@endsection
