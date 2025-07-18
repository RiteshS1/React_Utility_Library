import React, { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

// Demo Components
interface Task {
  id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

const BasicListDemo = () => {
  const fruits = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango']
  
  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Simple Fruit List</h3>
      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
        {fruits.map((fruit, index) => (
          <li key={index} style={{ marginBottom: '0.25rem' }}>
            {fruit}
          </li>
        ))}
      </ul>
    </div>
  )
}

const TodoListDemo = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Learn React Lists', completed: false, priority: 'high' },
    { id: '2', text: 'Understand Keys', completed: false, priority: 'high' },
    { id: '3', text: 'Practice Map Function', completed: true, priority: 'medium' },
    { id: '4', text: 'Build Todo App', completed: false, priority: 'low' }
  ])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        priority: 'medium'
      }
      setTasks([...tasks, task])
      setNewTask('')
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#22c55e'
      default: return '#6b7280'
    }
  }

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add new task..."
          style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button
          onClick={addTask}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#007acc', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Add
        </button>
      </div>

      <div>
        {tasks.map(task => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              marginBottom: '0.5rem',
              backgroundColor: task.completed ? '#f3f4f6' : 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '4px'
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: getPriorityColor(task.priority)
              }}
              title={`${task.priority} priority`}
            />
            <span
              style={{
                flex: 1,
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#6b7280' : 'inherit'
              }}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                padding: '0.25rem 0.5rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.75rem'
              }}
            >
              Delete
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6b7280', fontStyle: 'italic', margin: '2rem 0' }}>
            No tasks yet. Add one above!
          </p>
        )}
      </div>
    </div>
  )
}

const FilteredListDemo = () => {
  const [users] = useState([
    { id: 1, name: 'Alice Johnson', age: 28, department: 'Engineering', active: true },
    { id: 2, name: 'Bob Smith', age: 35, department: 'Marketing', active: false },
    { id: 3, name: 'Carol Davis', age: 31, department: 'Engineering', active: true },
    { id: 4, name: 'David Wilson', age: 29, department: 'Sales', active: true },
    { id: 5, name: 'Eva Brown', age: 26, department: 'Marketing', active: false },
    { id: 6, name: 'Frank Miller', age: 33, department: 'Engineering', active: true }
  ])
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const filteredUsers = users
    .filter(user => {
      if (filter === 'active') return user.active
      if (filter === 'inactive') return !user.active
      if (filter === 'engineering') return user.department === 'Engineering'
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'age') return a.age - b.age
      return 0
    })

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}>
            Filter:
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="all">All Users</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
            <option value="engineering">Engineering Only</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}>
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="name">Name</option>
            <option value="age">Age</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {filteredUsers.map(user => (
          <div
            key={user.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              backgroundColor: user.active ? '#f0f9ff' : '#fef2f2',
              border: `1px solid ${user.active ? '#007acc' : '#ef4444'}`,
              borderRadius: '4px'
            }}
          >
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0', color: '#1f2937' }}>{user.name}</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                {user.department} • Age {user.age}
              </p>
            </div>
            <span
              style={{
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: '600',
                borderRadius: '4px',
                backgroundColor: user.active ? '#22c55e' : '#ef4444',
                color: 'white'
              }}
            >
              {user.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        ))}
        {filteredUsers.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6b7280', fontStyle: 'italic', margin: '2rem 0' }}>
            No users match the current filter.
          </p>
        )}
      </div>
    </div>
  )
}

const NestedListDemo = () => {
  const categories = [
    {
      id: 'frontend',
      name: 'Frontend',
      technologies: [
        { id: 'react', name: 'React', popular: true },
        { id: 'vue', name: 'Vue.js', popular: true },
        { id: 'angular', name: 'Angular', popular: false },
        { id: 'svelte', name: 'Svelte', popular: false }
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      technologies: [
        { id: 'node', name: 'Node.js', popular: true },
        { id: 'python', name: 'Python', popular: true },
        { id: 'java', name: 'Java', popular: false },
        { id: 'go', name: 'Go', popular: false }
      ]
    },
    {
      id: 'database',
      name: 'Database',
      technologies: [
        { id: 'postgres', name: 'PostgreSQL', popular: true },
        { id: 'mongodb', name: 'MongoDB', popular: true },
        { id: 'mysql', name: 'MySQL', popular: false }
      ]
    }
  ]

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Technology Categories</h3>
      {categories.map(category => (
        <div key={category.id} style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ 
            margin: '0 0 0.5rem 0', 
            color: '#1f2937',
            fontSize: '1.125rem',
            fontWeight: '600'
          }}>
            {category.name}
          </h4>
          <div style={{ paddingLeft: '1rem' }}>
            {category.technologies.map(tech => (
              <div
                key={tech.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem',
                  marginBottom: '0.25rem',
                  backgroundColor: tech.popular ? '#f0f9ff' : '#f9fafb',
                  border: `1px solid ${tech.popular ? '#007acc' : '#e5e7eb'}`,
                  borderRadius: '4px'
                }}
              >
                <span style={{ fontSize: '0.875rem' }}>{tech.name}</span>
                {tech.popular && (
                  <span style={{
                    padding: '0.125rem 0.25rem',
                    fontSize: '0.625rem',
                    fontWeight: '600',
                    backgroundColor: '#22c55e',
                    color: 'white',
                    borderRadius: '2px'
                  }}>
                    POPULAR
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const ListsAndKeys: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Lists & Keys</h1>
        <p className="page-description">
          Understanding React lists, keys, and rendering collections efficiently.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">What are Lists in React?</h2>
        <p className="concept-description">
          Lists in React are collections of elements rendered using JavaScript's array methods, 
          primarily <code>map()</code>. They allow you to transform arrays of data into arrays of JSX elements, 
          making it easy to display dynamic collections of content like user lists, todo items, or navigation menus.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Basic List Rendering</h2>
        <p className="concept-description">
          The simplest way to render a list is using the <code>map()</code> method to transform an array of data into JSX elements:
        </p>
        <CodeBlock
          title="Simple List Example"
          code={`function FruitList() {
  const fruits = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango'];
  
  return (
    <div>
      <h3>Simple Fruit List</h3>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

// Note: Using index as key is okay for static lists,
// but not recommended for dynamic lists that can change`}
          showDemo={true}
          demoComponent={<BasicListDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Why Keys Matter</h2>
        <p className="concept-description">
          Keys help React identify which items have changed, been added, or removed. They enable React to 
          efficiently update the DOM by reusing existing elements instead of recreating them. Keys should be 
          stable, predictable, and unique among siblings.
        </p>
        <CodeBlock
          title="Keys Best Practices"
          code={`// ❌ Bad: Using array index (problematic for dynamic lists)
{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}

// ✅ Good: Using stable, unique identifier
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}

// ✅ Good: Creating composite key when no unique id exists
{items.map((item, index) => (
  <li key={\`\${item.category}-\${item.name}-\${index}\`}>
    {item.name}
  </li>
))}

// ✅ Good: Using crypto.randomUUID() for items without ids
const itemsWithIds = items.map(item => ({
  ...item,
  id: item.id || crypto.randomUUID()
}));`}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Dynamic List with CRUD Operations</h2>
        <p className="concept-description">
          Interactive lists that support adding, updating, and deleting items demonstrate the importance of proper keys:
        </p>
        <CodeBlock
          title="Todo List with Keys"
          code={`interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Learn React Lists', completed: false, priority: 'high' },
    { id: '2', text: 'Understand Keys', completed: false, priority: 'high' }
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(), // Better to use uuid in real apps
        text: newTask.trim(),
        completed: false,
        priority: 'medium'
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add new task..."
      />
      <button onClick={addTask}>Add</button>

      {tasks.map(task => (
        <div key={task.id}> {/* Stable, unique key */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span style={{ 
            textDecoration: task.completed ? 'line-through' : 'none' 
          }}>
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<TodoListDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Filtering and Sorting Lists</h2>
        <p className="concept-description">
          You can combine array methods like <code>filter()</code> and <code>sort()</code> with <code>map()</code> 
          to create dynamic, filtered, and sorted lists:
        </p>
        <CodeBlock
          title="Filtered and Sorted List"
          code={`function UserList() {
  const [users] = useState([
    { id: 1, name: 'Alice Johnson', age: 28, department: 'Engineering', active: true },
    { id: 2, name: 'Bob Smith', age: 35, department: 'Marketing', active: false },
    // ... more users
  ]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredUsers = users
    .filter(user => {
      if (filter === 'active') return user.active;
      if (filter === 'inactive') return !user.active;
      if (filter === 'engineering') return user.department === 'Engineering';
      return true; // 'all'
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'age') return a.age - b.age;
      return 0;
    });

  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All Users</option>
        <option value="active">Active Only</option>
        <option value="inactive">Inactive Only</option>
        <option value="engineering">Engineering Only</option>
      </select>
      
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="age">Sort by Age</option>
      </select>

      {filteredUsers.map(user => (
        <div key={user.id}>
          <h4>{user.name}</h4>
          <p>{user.department} • Age {user.age}</p>
          <span>{user.active ? 'Active' : 'Inactive'}</span>
        </div>
      ))}
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<FilteredListDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Nested Lists</h2>
        <p className="concept-description">
          When rendering nested data structures, you'll need keys for both the outer and inner lists:
        </p>
        <CodeBlock
          title="Nested List Structure"
          code={`function CategoryList() {
  const categories = [
    {
      id: 'frontend',
      name: 'Frontend',
      technologies: [
        { id: 'react', name: 'React', popular: true },
        { id: 'vue', name: 'Vue.js', popular: true },
        { id: 'angular', name: 'Angular', popular: false }
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      technologies: [
        { id: 'node', name: 'Node.js', popular: true },
        { id: 'python', name: 'Python', popular: true },
        { id: 'java', name: 'Java', popular: false }
      ]
    }
  ];

  return (
    <div>
      {categories.map(category => (
        <div key={category.id}> {/* Key for outer list */}
          <h4>{category.name}</h4>
          <div>
            {category.technologies.map(tech => (
              <div key={tech.id}> {/* Key for inner list */}
                <span>{tech.name}</span>
                {tech.popular && <span>POPULAR</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<NestedListDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Performance Considerations</h2>
        <div className="concept-description">
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li><strong>Stable Keys:</strong> Avoid using array indices for dynamic lists</li>
            <li><strong>Unique Keys:</strong> Each key should be unique among siblings</li>
            <li><strong>Memoization:</strong> Use React.memo() for expensive list items</li>
            <li><strong>Virtualization:</strong> Consider react-window for very long lists</li>
            <li><strong>Pagination:</strong> Break large lists into smaller chunks</li>
            <li><strong>Debouncing:</strong> Debounce search/filter operations</li>
          </ul>
        </div>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Common Patterns</h2>
        <CodeBlock
          title="Useful List Patterns"
          code={`// 1. Conditional rendering within lists
{items.map(item => (
  <div key={item.id}>
    <h3>{item.title}</h3>
    {item.description && <p>{item.description}</p>}
    {item.isNew && <span className="new-badge">NEW</span>}
  </div>
))}

// 2. Empty state handling
{items.length > 0 ? (
  <ul>
    {items.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
) : (
  <p>No items found.</p>
)}

// 3. Grouping list items
{Object.entries(groupedItems).map(([group, items]) => (
  <div key={group}>
    <h3>{group}</h3>
    {items.map(item => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
))}

// 4. List with separators
{items.map((item, index) => (
  <React.Fragment key={item.id}>
    <div>{item.name}</div>
    {index < items.length - 1 && <hr />}
  </React.Fragment>
))}

// 5. Chunked rendering (rows/columns)
{chunkArray(items, 3).map((chunk, rowIndex) => (
  <div key={rowIndex} className="row">
    {chunk.map(item => (
      <div key={item.id} className="column">
        {item.name}
      </div>
    ))}
  </div>
))}`}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Best Practices</h2>
        <div className="concept-description">
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li><strong>Always Use Keys:</strong> Every list item should have a unique key prop</li>
            <li><strong>Stable Keys:</strong> Keys should remain consistent between renders</li>
            <li><strong>No Index Keys for Dynamic Lists:</strong> Avoid using array index for lists that change</li>
            <li><strong>Extract List Items:</strong> Create separate components for complex list items</li>
            <li><strong>Handle Empty States:</strong> Always provide feedback when lists are empty</li>
            <li><strong>Optimize Large Lists:</strong> Use virtualization or pagination for large datasets</li>
            <li><strong>Accessible Lists:</strong> Use proper semantic HTML and ARIA attributes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ListsAndKeys
