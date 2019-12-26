class Tag < ApplicationRecord
    belongs_to :task, optional: true
end
