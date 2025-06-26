from app import app, db, User, Role, bcrypt

with app.app_context():
    # Recreate all tables
    db.drop_all()
    db.create_all()
    
    # Create roles
    admin_role = Role(name='admin')
    user_role = Role(name='user')
    db.session.add(admin_role)
    db.session.add(user_role)
    db.session.commit()
    
    # Create admin user
    admin_user = User(
        username='admin',
        email='admin@securedocs.com',
        auth_method='manual',
        role_id=admin_role.id
    )
    
    # Hash the admin password
    hashed = bcrypt.hashpw('>$WU)aHKCQcAT'.encode('utf-8'), bcrypt.gensalt())
    admin_user.password_hash = hashed.decode('utf-8')
    
    # Add and commit admin user
    db.session.add(admin_user)
    db.session.commit()
    
    print('Database tables recreated successfully!')
    print('Admin account created with:')
    print('Email: admin@securedocs.com')
    print('Password: >$WU)aHKCQcAT') 