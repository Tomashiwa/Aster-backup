Tag.create!(name: "None")
Tag.create!(name: "Red")
Tag.create!(name: "Yellow")
Tag.create!(name: "Green")
Tag.create!(name: "Blue")
Tag.create!(name: "Pink")

Task.create!(list_id: nil, title: "Task 1", description: "Daiya Sotaro", tag_id: 1, due_date: Time.now.utc)
Task.create!(list_id: nil, title: "Task 2", description: "Mirai Sena", tag_id: 2, due_date: Time.now.utc)
puts "Completed Seeding"