class Board < ApplicationRecord
  belongs_to :user, optional: true
end
