class List < ApplicationRecord
  belongs_to :board, optional: true
end
