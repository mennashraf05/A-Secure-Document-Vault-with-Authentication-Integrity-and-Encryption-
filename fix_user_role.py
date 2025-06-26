from app import app, db, User, Role

def fix_user_role():
    with app.app_context():
        # Get the user role
        user_role = Role.query.filter_by(name='user').first()
        if not user_role:
            print("Error: User role not found")
            return

        # Get the user account
        user = User.query.filter_by(username='user').first()
        if not user:
            print("Error: User account not found")
            return

        # Set the role to regular user
        user.role = user_role
        db.session.commit()
        print(f"Successfully changed {user.username}'s role to regular user")

if __name__ == '__main__':
    fix_user_role() 