from app import app, db, Role, User, bcrypt
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

def init_db():
    with app.app_context():
        # Create all tables
        db.create_all()
        print("Tables created (if not exist).")

        # Create roles if they don't exist
        admin_role = Role.query.filter_by(name='admin').first()
        if not admin_role:
            admin_role = Role(name='admin')
            db.session.add(admin_role)
            print("Admin role created.")
        else:
            print("Admin role already exists.")

        user_role = Role.query.filter_by(name='user').first()
        if not user_role:
            user_role = Role(name='user')
            db.session.add(user_role)
            print("User role created.")
        else:
            print("User role already exists.")

        db.session.commit()  # Commit roles before assigning to users

        # Get admin credentials from environment variables
        admin_email = os.environ.get('ADMIN_EMAIL')
        admin_password = os.environ.get('ADMIN_PASSWORD')
        admin_username = os.environ.get('ADMIN_USERNAME')

        print(f"\nAdmin credentials from .env:")
        print(f"Email: {admin_email}")
        print(f"Password: {admin_password}")
        print(f"Username: {admin_username}")

        if not all([admin_email, admin_password, admin_username]):
            print("Warning: Admin credentials not found in environment variables.")
            return

        # Create admin user if it doesn't exist
        admin_user = User.query.filter_by(email=admin_email).first()
        if not admin_user:
            admin_user = User(
                username=admin_username,
                email=admin_email,
                auth_method='manual',
                role=admin_role
            )
            # Hash the password correctly
            hashed = bcrypt.hashpw(admin_password.encode('utf-8'), bcrypt.gensalt())
            admin_user.password_hash = hashed.decode('utf-8')
            print(f"\nCreating new admin user:")
            print(f"Password hash: {admin_user.password_hash}")
            db.session.add(admin_user)
            db.session.commit()
            print("Admin user created.")
        else:
            # Update existing admin's password
            hashed = bcrypt.hashpw(admin_password.encode('utf-8'), bcrypt.gensalt())
            admin_user.password_hash = hashed.decode('utf-8')
            print(f"\nUpdating existing admin user:")
            print(f"Password hash: {admin_user.password_hash}")
            db.session.commit()
            print("Admin user password updated.")

        # Create 'user' user as regular user if it doesn't exist
        user_account = User.query.filter_by(username='user').first()
        if not user_account:
            user_password = os.environ.get('USER_PASSWORD', 'User@123')
            user_account = User(
                username='user',
                email='user@example.com',
                auth_method='manual',
                role=user_role  # Set as regular user
            )
            user_account.password_hash = bcrypt.hashpw(user_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            db.session.add(user_account)
            db.session.commit()
            print("'user' account created as regular user.")
        else:
            # Ensure 'user' account is set to user role
            if user_account.role != user_role:
                user_account.role = user_role
                db.session.commit()
                print("'user' account role updated to regular user.")
            else:
                print("'user' account already exists as regular user.")

        # Ensure only 'admin' and 'user' are admins, others are regular users
        for u in User.query.all():
            if u.username not in ['admin', 'user']:
                if u.role != user_role:
                    u.role = user_role
                    print(f"User '{u.username}' set to user role.")
            else:
                if u.role != admin_role:
                    u.role = admin_role
                    print(f"User '{u.username}' set to admin role.")

        db.session.commit()
        print("Database initialized with roles and users.")

if __name__ == '__main__':
    try:
        init_db()
    except Exception as e:
        print("Error during database initialization:", e) 