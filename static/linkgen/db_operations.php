<?php
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$database = "link_generator_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to insert link into database
function insertLink($link) {
    global $conn;
    $sql = "INSERT INTO links (link) VALUES ('$link')";
    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return false;
    }
}

// Function to get random link from database
function getRandomLink() {
    global $conn;
    $sql = "SELECT link FROM links ORDER BY RAND() LIMIT 1";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row["link"];
    } else {
        return null;
    }
}

$conn->close();
?>
