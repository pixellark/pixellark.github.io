<!DOCTYPE html>
<html>
<head>
    <title>PixelLark - Contact Form</title>
   <link rel="stylesheet" href="styles.css">
   
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta name="description" content="Grow your business with Pixellark's comprehensive digital solutions. From expertly crafted websites to targeted paid advertising campaigns, our team helps you stand out in the online world. Maximize your visibility, drive traffic, and achieve success with Pixellark's expertise in paid ads and website creation.">

   <meta name="keywords" content="Pixellark, digital solutions, website creation, paid advertising, online marketing, social media marketing, SEO services">

   <meta name="author" content="Pethum Kavinda Perera">




   <meta name="msapplication-TileImage" content="https://pixellark.com/tump.png">
   <meta property="og:site_name" content="PixelLark">
   <meta property="og:title" content="Social Media Marketing Agency">
   <meta property="og:description" content="Let us help you establish a strong online presence and unlock your business's growth potential.">
   <meta property="og:image" itemprop="image" content="https://pixellark.com/tump.png">
   <meta property="og:type" content="website" />
   <meta property="og:image:type" content="image/png">
   <meta property="og:image:width" content="300">
   <meta property="og:image:height" content="300">
   <meta property="og:url" content="pixellark.com">



   <link rel="icon" href="pixellark.png" type="image/icon type">


   <link rel="favicon" type="image/ico" href="https.pixellark.com/favicon.ico">

<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">



   <meta name="viewport" content="with=device-width, initial-scale=1.0">
   <title>PixelLark</title>

   <link rel="preconnect" href="https://fonts.googleapis.com">

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;300;500;600&display=swap" rel="stylesheet">

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;300;500;600&family=Roboto:wght@300;900&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700;800;900&family=Noto+Sans:wght@100;300;500;600&family=Roboto:wght@300;900&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700;800;900&family=Noto+Sans:wght@100;300;500;600&family=Roboto:wght@300;900&display=swap" rel="stylesheet">


<style>
    @media(max-width: 700px){
        body{
            height: 110vh;
        }
    
        .contact{
            height: 95%;
            width: 95%;
            flex-direction: column;
       
        }
    
        .map{
            height: 40%;
            width: 100%;
       
         
        }
        .form{
       
            height: 70%;
            width: 100%;
       
        
        }
        .form ::before{
           
            visibility: hidden;
        }
        .form h1{
        margin-left: 5%;
        margin-bottom: 4%;
    }
    .form button{
        margin-left: 3%;
        font-size: 16px;

    } 



    }</style>

</head>
<body>
    

  

<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Retrieve form data
  $name = $_POST["name"];
  $email = $_POST["email"];
 // $phone = $_POST["phone"];
 // $number = $_POST["number"];
  $message = $_POST["message"];

  // Create a new PHPMailer instance
  $mail = new PHPMailer(true);

  try {
    // SMTP configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';  // Replace with your SMTP server address
    $mail->SMTPAuth = true;
    $mail->Username = '01pethum4@gmail.com';  // Replace with your SMTP username/email
    $mail->Password = 'pchniiknwkynpwhp';  // Replace with your SMTP password
    $mail->SMTPSecure = 'ssl';  // Set the encryption type. Use 'tls' or 'ssl' if required
    $mail->Port = 465;  // Replace with your SMTP server port number

    // Sender and recipient settings
    $mail->setFrom($email, $name);
    $mail->addAddress('info@pixellark.com');  // Replace with the recipient's email address

    // Email content
    $mail->Subject = 'New Form Submission';
    $mail->Body = "Name: " . $name . "\n";
    $mail->Body .= "Email: " . $email . "\n";
   // $mail->Body .= "Phone: " . $phone . "\n";
  //  $mail->Body .= "Number: " . $number . "\n";
    $mail->Body .= "Message: " . $message . "\n";

    // Send the email
    $mail->send();

    // Display a success message
    echo '<div class="contact">
    <div class="map">

      


    </div>

    <div class="form">
         <h1>Thank you for your submission! We will get back to you soon.</h1>



         <form action="mail.php" method="POST">
             
         
             
             
             <button type="submit">Send Message</button>
         </form>

     </div>

 </div>';
  } catch (Exception $e) {
    // Display an error message
    echo "Oops! Something went wrong. Please try again later.";
    // Uncomment the line below for debugging purposes
    // echo "Mailer Error: " . $mail->ErrorInfo;
  }
}
?>

</body>
</html>
