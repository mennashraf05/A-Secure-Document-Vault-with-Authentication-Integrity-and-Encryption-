# 🔐 SecureDocs – A Secure Document Vault

A secure web platform designed to store, sign, and manage documents with robust **encryption**, **authentication**, and **integrity** mechanisms.

> 🛡️ Built for the Final Project in **Data Integrity and Authentication – Spring 2024/2025**

---

## 🌟 Features

### 🔐 Authentication & Access Control
- OAuth 2.0 login with **Google** or **GitHub**
- SSO login via **Okta**
- **Two-Factor Authentication (2FA)** using Google Authenticator
- **Session-based login** with token expiration
- **Role-based UI** (Admin/User access levels)

### 📂 Document Vault
- Upload PDF, DOCX, or TXT files
- **AES encryption** for secure storage
- **SHA-256 hashing** for integrity
- **Digital signatures** via OpenSSL
- Verify signatures and integrity on download

### 👤 User Profile Management
- View & edit user profiles
- Admins can view/edit all users & roles
- Enforce secure password policies

### 🌐 Secure Communication
- HTTPS support with local SSL/TLS (OpenSSL)
- Wireshark-based simulation of **MITM attacks** vs. secure traffic

### 🖥️ UI/UX
- Responsive design using **Bootstrap/Tailwind**
- Pages include:
  - Login/Register with OAuth
  - 2FA Setup (QR Code + TOTP)
  - Dashboard (role-based)
  - Upload Form
  - Document List (with integrity & signature check)
  - User Profile
  - Admin Panel
  - Audit Logs

---

## 🧠 Technologies Used
- **Python Flask**
- **MySQL**
- **OAuth 2.0**
- **Okta**
- **Google Authenticator (TOTP)**
- **OpenSSL**
- **Bootstrap / TailwindCSS**
- **Wireshark (Security Audit)**

---
