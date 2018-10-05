 <!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<link rel="stylesheet" href="css/chart.css" />
		<link rel="stylesheet" href="css/tab.css" type="text/css">
		<link rel="stylesheet" href="css/buttons.css" type="text/css">
		<link rel="stylesheet" href="css/fileSelector.css" type="text/css">
		<title>Subject Area Analysis</title>
		<link rel="stylesheet" href="css/font-awesome/css/font-awesome.min.css" />
		<link rel="stylesheet" href="css/layout.css" />
		<link rel="stylesheet" href="css/header.css" />
		<link rel="stylesheet" href="css/footer.css" />
		<link rel="stylesheet" href="css/overrides.css" />

		<!-- Latest bootstrap installation -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<script src="js/tabs.js"></script>
		<script src="https://d3js.org/d3.v3.min.js"></script>	

	</head>

	<body>

		<div class="container main-content">



			<!-- site header -->
			<header id='site-header'>

				<nav id='top-menu'>
					<ul>
						<li><a href='http://www.onlines3.eu/'>Online S3 Project</a></li>
						<li class="active"><a href='#'><i class="fa fa-lightbulb-o" aria-hidden="true"></i>Applications</a></li>
						<li><a href='#'/><i class="fa fa-cog" aria-hidden="true"></i>Toolbox</a></li>
						<li><a href='#'/><i class="fa fa-bar-chart" aria-hidden="true"></i>Analytics</a></li>
						<li><a href='#'/><i class="fa fa-life-ring" aria-hidden="true"></i></i>Support</a></li>
						<li><a href='#'/><i class="fa fa-envelope-o" aria-hidden="true"></i>Contact</a></li>
					</ul>
				</nav>

				<div id='header-main'>

					<div class='top-section'>
						<div class='headers'>   
							<img class='logo-img' src='img/logo.png' width='77'>
							<div>
								<p class="heading"><a href='#'>Online S3 Platform</a></p> 
								<p class="sub-heading">Regional scientific production profile</p>
							</div>
						</div>
								
						<div class="social-links">
							<a href="https://twitter.com/online_s3" title="Twitter" target="_blank"><i class="fa fa-twitter-square" aria-hidden="true"></i></a>
							<a href="https://plus.google.com/102042915278982824881" title="Google+" target="_blank"><i class="fa fa-google-plus-square" aria-hidden="true"></i></a>
							<a href="https://www.youtube.com/channel/UCuYNnd9rdrN_EbF5_P0Nmog" title="YouTube" target="_blank"><i class="fa fa-youtube-square" aria-hidden="true"></i></a>
						
							<!-- <a href="https://twitter.com/online_s3" title="Twitter" target="_blank">L</a>  -->
							<!-- <a href="https://plus.google.com/102042915278982824881" title="Google+" target="_blank">G</a>  -->
							<!-- <a href="https://www.youtube.com/channel/UCuYNnd9rdrN_EbF5_P0Nmog" title="YouTube" target="_blank">X</a>  -->
							<!-- <a href="http://www.onlines3.eu/feed/" title="Newsfeed" target="_blank">R</a> -->
						</div>
					</div>

					<div class='bottom-section'>
						<div class="menu">
							<ul>
								<li><a href="index.html">About</a></li>
								<li><a href="#">Use cases</a></li>
								<li><a href='app.html'>Access to application</a></li>
							</ul>
						</div>

						<div class='user-btns'>
							<button class='login-btn'> Sign in </button>
							<button class='register-btn'> Sign up </button>
						</div>
					</div>

				</div>

				<div id='breadcrumb'>
					<ul>
						<li><a href='#'>Online S3 Platform</a></li>
						<li><a href='#'>Analysis of context</a></li>
						<li><span>Regional scientific production profile</span></li>
					</ul>
				</div>

			</header>
			<!-- site header END -->

			<div class="col-md-12">


				<!-- title row -->
				<div class="row">
					<h1>Subject Area Analysis</h1>
				</div>
				<!-- content row -->
				<div class="row">

					<!-- options column -->
					<div class="col-md-7 ">

						<div class="row col-md-12">

							<div id='chart'>
								<p>Please upload the Scopus .csv file<br></p>
								<input type="file" name="file" id="file">
								<input type="button" class="blueButton" id="yearSelectorButton" value="Add CSV file(s)">
								<input type="button" class="redButton clearButton" id="yearClearButton" value="Clear">
								<script>
									document.getElementById('file').onchange = function(){
										var file = this.files[0];
										var reader = new FileReader();
										reader.onload = function(progressEvent){
											// By lines
											var dataToD3 = [];
											var lines = this.result.split('\n');
											for(var line = 8; line < lines.length; line++){
												var cols=lines[line].split(",");
												var area = cols[0];
												var num = cols[1];
												dataToD3.push({
											  		Area: cols[0],
													Publications: cols[1]
												});
											}
											console.log(dataToD3);
										};
										reader.readAsText(file);

									}; 										
								</script> 
							</div>
						</div>
			
						<!-- left column buttons row -->
						<div class="row col-md-12 temp-img">
							<img class="img-responsive" src="img/before_results.jpg">
						</div>

						<!-- left column images row -->
						<div class="row col-md-12 temp-img">
							<img class="img-responsive" src="img/before_results.jpg">
						</div>

					</div>

					<!-- right buttons column -->
					<div class="col-md-3 col-md-offset-2 buttons_section">
						<div class="row">
	                        <ul>
	                            <li><button type="button" class="btn btn-lg btn-danger btn-block">Clear Table<i class="fa fa-file-pdf-o" aria-hidden="true"></i></button></li>
	                            <li><button type="button" class="btn btn-lg btn-primary btn-block">Export CSV<i class="fa fa-file-pdf-o" aria-hidden="true"></i></button></li>
	                        </ul>
	                    </div>
						
					</div>
				</div>
			</div>

			<!-- site footer -->
			<footer id='site-footer'>

				<div id="footer-links">
			        <ul>
			            <li><a href="#"><span>Online S3 Project</span></a></li>
			            <li class="active"><a href="#"><span>Applications</span></a></li>
			            <li><a href="#"><span>Toolbox</span></a></li>
			            <li><a href="#"><span>Analytics</span></a></li>
			            <li><a href="#">Support</span></a></li>
			            <li><a href="#"><span>Contact</span></a></li>
			        </ul>
			        <div id='copyright'>
			            <img src="img/logo.png" width="30" alt="online logo">
			            <p>Copyright &copy; 2016-2017 OnlineS3 Project</p>
			        </div>
			    </div>

			    <div id="european">
			        <img src="img/eu_logo.png" width="85" alt="Co-funded by the European Union">

			        <p>
			            Funded by the Horizon 2020 Framework Programme of the European Union.
			        </p>
			    </div>
				
			</footer>

		</div>

	</body>

</html>