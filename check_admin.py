from app import app, db, User, Role
import bcrypt

with app.app_context():
    admin = User.query.join(Role).filter(
        User.email == 'admin@securedocs.com',
        Role.name == 'admin'
    ).first()
    
    if admin:
        print(f'Admin found: Yes')
        print(f'Admin username: {admin.username}')
        print(f'Admin email: {admin.email}')
        print(f'Admin role: {admin.role.name}')
        print(f'Admin password hash: {admin.password_hash}')
        
        # Test password
        test_password = '>$WU)aHKCQcAT'
        print(f'Test password: {test_password}')
        
        try:
            password_correct = bcrypt.checkpw(
                test_password.encode('utf-8'),
                admin.password_hash.encode('utf-8')
            )
            print(f'Password check: {"Correct" if password_correct else "Incorrect"}')
        except Exception as e:
            print(f'Error checking password: {e}') 