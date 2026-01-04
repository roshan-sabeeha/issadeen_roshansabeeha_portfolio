<?php
// This is the standalone contact form page
// The main contact form is already in index.html and uses send_email.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact | Benazir Farvin</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <a href="index.html" class="logo">BENAZIR FARVIN</a>
            <ul class="nav-menu">
                <li><a href="index.html">Home</a></li>
                <li><a href="index.html#about">About</a></li>
                <li><a href="index.html#skills">Skills</a></li>
                <li><a href="index.html#qualifications">Qualifications</a></li>
                <li><a href="index.html#experience">Experience</a></li>
                <li><a href="contact.php">Contact</a></li>
            </ul>
            <button class="menu-toggle">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </nav>

    <section class="section contact" style="padding-top: 120px;">
        <div class="container">
            <h2 class="section-title">Contact Me</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <h3>Get In Touch</h3>
                    <div class="contact-details">
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <div>
                                <h4>Phone</h4>
                                <p>+94 767251686</p>
                            </div>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <div>
                                <h4>Email</h4>
                                <p>benaziragafoor93@gmail.com</p>
                            </div>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Address</h4>
                                <p>No. 90, Keechar Lane, Sammanthurai - 04</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="reference">
                        <h3>Reference</h3>
                        <div class="reference-card">
                            <h4>MMM. Najeem</h4>
                            <p>Managing Director of H&D Nursing School</p>
                            <div class="reference-contact">
                                <p><i class="fas fa-phone"></i> 077 3834560</p>
                                <p><i class="fas fa-envelope"></i> najeem20@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="contact-form-container">
                    <h3>Send Me a Message</h3>
                    <form action="send_email.php" method="POST" class="contact-form" id="contactForm">
                        <div class="form-group">
                            <label for="name">Full Name *</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address *</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="text" id="phone" name="phone">
                        </div>
                        <div class="form-group">
                            <label for="subject">Subject *</label>
                            <input type="text" id="subject" name="subject" required>
                        </div>
                        <div class="form-group">
                            <label for="message">Your Message *</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Send Message</button>
                        <div id="form-message"></div>
                    </form>
                    
                    <?php
                    // Display success or error message if redirected from send_email.php
                    if (isset($_GET['status'])) {
                        if ($_GET['status'] == 'success') {
                            echo '<div style="margin-top: 20px; padding: 15px; background-color: #d4edda; color: #155724; border-radius: 5px; border: 1px solid #c3e6cb;">
                                    <i class="fas fa-check-circle"></i> Your message has been sent successfully!
                                  </div>';
                        } elseif ($_GET['status'] == 'error') {
                            echo '<div style="margin-top: 20px; padding: 15px; background-color: #f8d7da; color: #721c24; border-radius: 5px; border: 1px solid #f5c6cb;">
                                    <i class="fas fa-exclamation-triangle"></i> There was an error sending your message. Please try again.
                                  </div>';
                        }
                    }
                    ?>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 Abdul Gafoor Benazir Farvin. All rights reserved.</p>
            <p>Designed with <i class="fas fa-heart"></i> as a professional portfolio</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>