import { DataTypes } from 'sequelize';
import sequelize from './db.js';

export const Role = sequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    // tableName: 'the_roles',
    timestamps: false
});

export const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

export const UserRole = sequelize.define('UserRole', {
    userId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    },
    roleId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
            model: 'roles',
            key: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    }
}, {
    tableName: 'user_role',
    timestamps: false
});

export const Genre = sequelize.define('Genre', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false
});

export const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    genreId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'genres',
            key: 'id',
            onDelete: 'RESTRICT'
        }
    },
    totalCopies: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0
        }
    },
    availableCopies: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0
        }
    }
}, {
    timestamps: false
});

export const Loan = sequelize.define('Loan', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
            onDelete: 'CASCADE'
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'books',
            key: 'id',
            onDelete: 'CASCADE',
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    loanDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    returnDate: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false
});

export const Log = sequelize.define('Log', {
    action: {
        type: DataTypes.ENUM('ISSUE', 'RETURN'),
        defaultValue: 'ISSUE'
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    book: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    timestamps: true, // Keep timestamps enabled
    createdAt: 'datetime',  // Ensure createdAt is on
    updatedAt: false  // Disable updatedAt
});