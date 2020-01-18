class User < ApplicationRecord
    has_secure_password
    has_many :tags, dependent: :destroy
    has_many :boards, dependent: :destroy

    validates_uniqueness_of :name
    validates_length_of :name, minimum: 4, message: "username must be more than or equals to 4 characters."
    validates_length_of :name, maximum: 16, message: "username must be less than or equals to 16 characters."

    validates_length_of :password, minimum: 6, message: "password must be more than or equals to 6 characters."
    validates_length_of :password, maximum: 20, message: "password must be less than or equals to 20 characters."
    
    validates_length_of :password_confirmation, minimum: 6, message: "password confirmation must be more than or equals to 6 characters."
    validates_length_of :password_confirmation, maximum: 20, message: "password confirmation must be less than or equals to 20 characters."
    
    validates_length_of :password_digest, minimum: 6, message: "encrypted password must be more than or equals to 6 characters"
end
