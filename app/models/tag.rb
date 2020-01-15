class Tag < ApplicationRecord
    belongs_to :user, optional: true
end
