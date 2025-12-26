# Face Recognition Attendance System

A comprehensive web-based face recognition attendance system built with Laravel and Filament. This application leverages advanced face recognition technology to automate attendance tracking and user management across educational institutions.

## Features

- **Face Recognition**: Automated face detection and recognition for attendance tracking
- **User Management**: Role-based access control (Admin, Student, Teacher)
- **Attendance Tracking**: Track attendance with multiple methods and status updates
- **Admin Dashboard**: Filament-powered admin interface for managing classes, students, and attendance records
- **Face Embeddings**: Store and manage face embeddings for accurate recognition
- **RESTful API**: Backend API integration for face recognition operations
- **Authentication**: Secure user authentication system

## Project Structure

```
├── app/
│   ├── Console/          # CLI commands
│   ├── Enums/            # Enumeration classes (UserRole, AttendanceStatus, etc.)
│   ├── Filament/         # Filament admin panel resources
│   ├── Helpers/          # Helper functions (ImageHelper, ResponseHelper)
│   ├── Http/             # Controllers, Middleware, Requests, Resources
│   ├── Models/           # Eloquent models (User, Student, Face, Attendance, etc.)
│   ├── Policies/         # Authorization policies
│   ├── Providers/        # Service providers
│   └── Services/         # Business logic services
├── config/               # Application configuration files
├── database/
│   ├── migrations/       # Database migrations
│   ├── factories/        # Model factories for testing
│   └── seeders/          # Database seeders
├── resources/
│   ├── views/            # Blade templates
│   ├── css/              # Tailwind CSS files
│   └── js/               # JavaScript assets
├── routes/               # Route definitions
├── tests/                # Unit and feature tests
├── storage/              # Application storage
└── public/               # Publicly accessible files
```

## Requirements

- PHP 8.1 or higher
- Composer
- Node.js and npm
- Laravel 11.x
- Database (MySQL/PostgreSQL)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd face_reg_client
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Create environment configuration**
   ```bash
   cp .env.example .env
   ```

5. **Generate application key**
   ```bash
   php artisan key:generate
   ```

6. **Configure database**
   Update your `.env` file with database credentials, then run migrations:
   ```bash
   php artisan migrate
   ```

7. **Build frontend assets**
   ```bash
   npm run build
   ```

8. **Create storage symlink** (if needed)
   ```bash
   php artisan storage:link
   ```

## Configuration

### Key Configuration Files

- `config/api.php` - API configuration
- `config/attendance.php` - Attendance-related settings
- `config/constants.php` - Application constants
- `config/filament.php` - Filament admin panel settings

### Environment Variables

Update the `.env` file with:
- `APP_NAME`, `APP_URL`
- `DB_*` - Database connection details
- `MAIL_*` - Email configuration (if needed)
- `API_*` - Backend API endpoints for face recognition

## Usage

### Running the Application

1. **Development server**
   ```bash
   php artisan serve
   ```

2. **Development with Vite**
   ```bash
   npm run dev
   ```

3. **Access Filament Admin Panel**
   Navigate to `http://localhost:8000/admin`

### Managing Users and Roles

Users are assigned specific roles (Admin, Student, Teacher) which determine their access levels and permissions. Use the admin panel to manage user roles and permissions.

### Attendance Management

- Track attendance through face recognition
- View attendance history and reports
- Multiple attendance methods supported
- Attendance status management

### Face Recognition

- Upload and process face images
- Generate and store face embeddings
- Integrate with backend face recognition API
- Automatic recognition and matching

## Available Commands

```bash
# Run migrations
php artisan migrate

# Run tests
php artisan test

# Run PHPUnit tests
./vendor/bin/phpunit

# Clear application cache
php artisan cache:clear

# Create new Filament resource
php artisan make:filament-resource ResourceName
```

## Testing

Run the test suite using PHPUnit:

```bash
./vendor/bin/phpunit
```

Or use Laravel's test command:

```bash
php artisan test
```

## Services

### FaceRecognitionService
Handles face detection, embedding generation, and recognition logic.

### BackendApiService
Communicates with the backend API for face recognition operations.

### UserService
Manages user-related operations and business logic.

## API Integration

The application integrates with a backend API for face recognition. Configure the API endpoints in `config/api.php`.

## Database Models

- **User**: System users with roles
- **StudentAccount**: Student-specific information
- **Face**: Face records for users
- **FaceEmbedding**: Vectorized face embeddings for recognition
- **Attendance**: Attendance records
- **ClassModel**: Class information and management

## Security

- Role-based access control (RBAC) with Filament policies
- Input validation on all requests
- CSRF protection enabled
- Authentication middleware on protected routes

## License

This project is proprietary. All rights reserved.

## Support

For issues or questions, please contact the development team.

---

Built with ❤️ using Laravel, Filament, and modern web technologies.
