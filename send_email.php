<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode(['status' => 'error', 'message' => 'Please fill all required fields']);
        exit();
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Please enter a valid email address']);
        exit();
    }
    
    try {
        // Create PHPMailer instance
        $mail = new PHPMailer(true);
        
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'roshansabeeha776@gmail.com'; // Your Gmail
        $mail->Password   = 'mtoy qunq njpa eusb';     // Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        
        // Recipients
        $mail->setFrom('roshansabeeha776@gmail.com', 'Benazir Portfolio');
        $mail->addAddress('roshansabeeha776@gmail.com', 'Benazir Farvin');
        $mail->addReplyTo($email, $name);
        
        // Create beautiful HTML email
        $emailContent = createEmailTemplate($name, $email, $phone, $subject, $message);
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = "📧 Portfolio Message: $subject";
        $mail->Body    = $emailContent;
        $mail->AltBody = createPlainTextEmail($name, $email, $phone, $subject, $message);
        
        // Add logo/header image (optional)
        // $mail->AddEmbeddedImage('logo.png', 'logo', 'logo.png');
        
        if ($mail->send()) {
            // Also send auto-reply to sender
            sendAutoReply($name, $email, $subject);
            
            echo json_encode(['status' => 'success', 'message' => 'Message sent successfully!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to send message. Please try again.']);
        }
        
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Mailer Error: ' . $mail->ErrorInfo]);
    }
    
    exit();
}

// Function to create beautiful HTML email template
function createEmailTemplate($name, $email, $phone, $subject, $message) {
    $date = date('F j, Y, g:i a');
    $phone_display = $phone ? $phone : 'Not provided';
    
    return '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Portfolio Message</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f8f9fa;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            
            .email-header {
                background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            
            .email-logo {
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            
            .email-title {
                font-size: 22px;
                font-weight: 600;
                margin: 15px 0;
            }
            
            .email-subtitle {
                font-size: 14px;
                opacity: 0.9;
            }
            
            .email-body {
                padding: 30px;
            }
            
            .message-card {
                background: #f8f9fa;
                border-left: 4px solid #6a11cb;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            }
            
            .message-card p {
                font-size: 16px;
                color: #555;
                line-height: 1.8;
            }
            
            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
                margin: 25px 0;
            }
            
            .info-item {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                border: 1px solid #e9ecef;
            }
            
            .info-label {
                font-size: 12px;
                color: #6a11cb;
                font-weight: 600;
                text-transform: uppercase;
                margin-bottom: 5px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .info-value {
                font-size: 16px;
                color: #333;
                font-weight: 500;
            }
            
            .icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                background: rgba(106, 17, 203, 0.1);
                border-radius: 50%;
                color: #6a11cb;
            }
            
            .email-footer {
                background: #f8f9fa;
                padding: 20px;
                text-align: center;
                border-top: 1px solid #e9ecef;
                color: #666;
                font-size: 14px;
            }
            
            .action-button {
                display: inline-block;
                background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 25px;
                font-weight: 600;
                margin: 20px 0;
                transition: transform 0.3s ease;
            }
            
            .action-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3);
            }
            
            .highlight {
                color: #6a11cb;
                font-weight: 600;
            }
            
            .timestamp {
                font-size: 12px;
                color: #999;
                text-align: right;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #eee;
            }
            
            @media (max-width: 600px) {
                .email-container {
                    border-radius: 0;
                }
                
                .email-header {
                    padding: 20px;
                }
                
                .email-body {
                    padding: 20px;
                }
                
                .info-grid {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header -->
            <div class="email-header">
                <div class="email-logo">
                    <span class="icon">👤</span>
                    Benazir Farvin
                </div>
                <h1 class="email-title">New Contact Form Submission</h1>
                <p class="email-subtitle">Someone has sent you a message through your portfolio website</p>
            </div>
            
            <!-- Body -->
            <div class="email-body">
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">
                            <span class="icon">👤</span>
                            Sender Name
                        </div>
                        <div class="info-value">' . $name . '</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">
                            <span class="icon">✉️</span>
                            Email Address
                        </div>
                        <div class="info-value">
                            <a href="mailto:' . $email . '" style="color: #6a11cb; text-decoration: none;">
                                ' . $email . '
                            </a>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">
                            <span class="icon">📱</span>
                            Phone Number
                        </div>
                        <div class="info-value">' . $phone_display . '</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">
                            <span class="icon">📌</span>
                            Subject
                        </div>
                        <div class="info-value highlight">' . $subject . '</div>
                    </div>
                </div>
                
                <div class="message-card">
                    <div class="info-label">
                        <span class="icon">💬</span>
                        Message
                    </div>
                    <p>' . nl2br($message) . '</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="mailto:' . $email . '" class="action-button">
                        ✉️ Reply to ' . $name . '
                    </a>
                </div>
                
                <div class="timestamp">
                    📅 Received on ' . $date . '
                </div>
            </div>
            
            <!-- Footer -->
            <div class="email-footer">
                <p>This message was sent from your portfolio website contact form.</p>
                <p style="margin-top: 10px; font-size: 12px;">
                    <a href="#" style="color: #6a11cb; text-decoration: none;">View Portfolio</a> • 
                    <a href="#" style="color: #6a11cb; text-decoration: none;">Contact Settings</a>
                </p>
            </div>
        </div>
    </body>
    </html>
    ';
}

// Function to create plain text version
function createPlainTextEmail($name, $email, $phone, $subject, $message) {
    $date = date('F j, Y, g:i a');
    $phone_display = $phone ? $phone : 'Not provided';
    
    return "
    NEW PORTFOLIO MESSAGE
    =====================
    
    You have received a new message from your portfolio website.
    
    📧 Sender Details:
    -----------------
    Name:    $name
    Email:   $email
    Phone:   $phone_display
    Subject: $subject
    
    💬 Message:
    -----------
    $message
    
    📅 Received on: $date
    
    🔗 This message was sent from your portfolio contact form.
    ";
}

// Function to send auto-reply to sender
function sendAutoReply($name, $email, $subject) {
    try {
        $mail = new PHPMailer(true);
        
        // Server settings (same as above)
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'roshansabeeha776@gmail.com';
        $mail->Password   = 'mtoy qunq njpa eusb';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        
        // Recipients
        $mail->setFrom('roshansabeeha776@gmail.com', 'Benazir Farvin');
        $mail->addAddress($email, $name);
        
        // Auto-reply content
        $autoReplyContent = createAutoReplyTemplate($name);
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = "✅ Thank you for contacting Benazir Farvin";
        $mail->Body    = $autoReplyContent;
        
        $mail->send();
        return true;
    } catch (Exception $e) {
        // Don't throw error for auto-reply failure
        error_log("Auto-reply failed: " . $e->getMessage());
        return false;
    }
}

// Auto-reply template
function createAutoReplyTemplate($name) {
    return '
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6a11cb, #2575fc); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { padding: 30px; background: #f9f9f9; }
            .footer { padding: 20px; text-align: center; color: #666; font-size: 14px; }
            .highlight { color: #6a11cb; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Thank You for Contacting Me!</h1>
            </div>
            <div class="content">
                <p>Dear <span class="highlight">' . $name . '</span>,</p>
                
                <p>Thank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
                
                <p>In the meantime, you can:</p>
                <ul>
                    <li>📁 View my complete portfolio</li>
                    <li>📄 Download my resume</li>
                    <li>💼 Check out my recent projects</li>
                </ul>
                
                <p>Best regards,<br>
                <strong>Abdul Gafoor Benazir Farvin</strong></p>
            </div>
            <div class="footer">
                <p>This is an automated response. For immediate assistance, please call +94 767251686</p>
            </div>
        </div>
    </body>
    </html>
    ';
}
?>