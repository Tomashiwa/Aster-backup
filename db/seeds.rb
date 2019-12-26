Tag.create!(name: "Cat")
Tag.create!(name: "Dog")

Task.create!(list_id: nil, title: "Task 1", description: "Daiya Sotaro", tag_id: 1, due_date: Time.now.utc)
Task.create!(list_id: nil, title: "Task 2", description: "Mirai Sena", tag_id: 2, due_date: Time.now.utc)
puts "data loaded success"