const { sequelize } = require("../configs/dbConfig");
const Book = require("./book");
const Comment = require("./comment");
const Review = require("./review");
const User = require("./user");

Book.hasMany(Review, { foreignKey: { name: "book_id", allowNull: false }, as: "book_reviews" });
Review.belongsTo(Book, { foreignKey: { name: "book_id", allowNull: false } });

Review.hasMany(Comment, { foreignKey: { name: "review_id", allowNull: false }, as: "review_comments" });
Comment.belongsTo(Review, { foreignKey: { name: "review_id", allowNull: false } });

User.hasMany(Review, { foreignKey: { name: "user_id", allowNull: false }, as: "user_reviews" });
Review.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false } });

User.hasMany(Comment, { foreignKey: { name: "user_id", allowNull: false }, as: "user_comments" });
Comment.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false } });

// sequelize.sync();

module.exports = {
    Book,
    Comment,
    Review,
    User,
};