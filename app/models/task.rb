class Task < ApplicationRecord
  # remove "optional: true" when implementing list
  # remove "null: true" and re-migrate entire db 
  belongs_to :list, optional: true
end