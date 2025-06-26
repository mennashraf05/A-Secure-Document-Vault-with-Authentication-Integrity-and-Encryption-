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
## 🚀 How to Run the Project

Follow these steps to set up and run the project locally:

### 1. 📦 Clone the Repository
```bash
git clone https://github.com/mennashraf05/A-Secure-Document-Vault-with-Authentication-Integrity-and-Encryption-.git
cd A-Secure-Document-Vault-with-Authentication-Integrity-and-Encryption-
---
2. 🐍 Create & Activate a Virtual Environment (optional but recommended)
python -m venv venv
source venv/bin/activate   # on Linux/macOS
venv\Scripts\activate      # on Windows
---
3. 📚 Install Dependencies

pip install -r requirements.txt
4. ⚙️ Set Up Environment Variables
Create a .env file in the root directory with the following variables:

env
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
DATABASE_URI=mysql://username:password@localhost/securevault
OAUTHLIB_INSECURE_TRANSPORT=1  # Only for development
✅ Replace username, password, and your-secret-key accordingly.

5. 🗄️ Set Up the Database
Log into MySQL and run:

CREATE DATABASE securevault;
Then, inside the project folder, run:

flask db init
flask db migrate
flask db upgrade
6. 🔑 Configure OAuth (Google / GitHub / Okta)
You’ll need to register your app with:

Google Developers Console

GitHub Developer Settings

Okta

Then update .env with the credentials:

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
OKTA_CLIENT_ID=...
OKTA_CLIENT_SECRET=...
7. ✅ Run the App

flask run
Visit: http://127.0.0.1:5000

8. 🔐 2FA Setup
On first login, you will be prompted to configure 2FA using a QR code.
Use Google Authenticator or any TOTP app to scan it.

9. 🛡️ HTTPS (Optional for Production)
You can configure HTTPS locally using OpenSSL:

openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
Then run Flask with:

flask run --cert=cert.pem --key=key.pem
