class Api::TaskResource < JSONAPI::Resource
    attributes :list, :title, :description, :tag, :due_date
end