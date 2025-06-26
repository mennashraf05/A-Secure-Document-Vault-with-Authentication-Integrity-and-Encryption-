import sqlite3
import os

def migrate_database():
    db_path = 'auth_system.db'
    
    # Connect to the database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if columns exist
        cursor.execute("PRAGMA table_info(document)")
        columns = [column[1] for column in cursor.fetchall()]
        
        # Add file_path column if it doesn't exist
        if 'file_path' not in columns:
            cursor.execute("ALTER TABLE document ADD COLUMN file_path VARCHAR(255)")
            print("Added file_path column")
            
        # Add folder column if it doesn't exist
        if 'folder' not in columns:
            cursor.execute("ALTER TABLE document ADD COLUMN folder VARCHAR(255)")
            print("Added folder column")
            
        # Commit the changes
        conn.commit()
        print("Database migration completed successfully")
        
    except Exception as e:
        print(f"Error during migration: {str(e)}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate_database() 