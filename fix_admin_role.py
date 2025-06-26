from app import app, db, User, Role

def fix_admin_role():
    with app.app_context():
        # Get the admin role
        admin_role = Role.query.filter_by(name='admin').first()
        if not admin_role:
            print("Error: Admin role not found")
            return

        # Get the user that needs to be changed back to admin
        user = User.query.filter_by(username='admin').first()
        if not user:
            print("Error: Admin user not found")
            return

        # Set the role back to admin
        user.role = admin_role
        db.session.commit()
        print(f"Successfully changed {user.username}'s role back to admin")

if __name__ == '__main__':
    fix_admin_role() 