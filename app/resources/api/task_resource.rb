class Api::TaskResource < JSONAPI::Resource
    attributes :list, :title, :description, :tag_id, :due_date
end