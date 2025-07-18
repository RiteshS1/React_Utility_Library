import React, { useState, useMemo } from 'react'
import CodeBlock from '../components/CodeBlock'

// Demo Components
const ExpensiveCalculationDemo = () => {
  const [count, setCount] = useState(1)
  const [items, setItems] = useState(['apple', 'banana', 'orange'])
  const [multiplier, setMultiplier] = useState(1)

  // Expensive calculation without useMemo (for demonstration)
  const expensiveValueWithoutMemo = (() => {
    console.log('🔴 Expensive calculation WITHOUT useMemo - running on every render!')
    let result = 0
    for (let i = 0; i < count * 1000000; i++) {
      result += i
    }
    return result
  })()

  // Expensive calculation with useMemo
  const expensiveValueWithMemo = useMemo(() => {
    console.log('🟢 Expensive calculation WITH useMemo - only running when count changes!')
    let result = 0
    for (let i = 0; i < count * 1000000; i++) {
      result += i
    }
    return result
  }, [count]) // Only recalculate when count changes

  // Simple calculation with useMemo
  const multipliedValue = useMemo(() => {
    console.log('🔵 Simple calculation with useMemo - running when count or multiplier changes')
    return count * multiplier
  }, [count, multiplier])

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Expensive Calculation Optimization</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          Count: {count}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          Multiplier: {multiplier}
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => setItems([...items, `item-${items.length + 1}`])}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginRight: '0.5rem'
          }}
        >
          Add Item (triggers re-render)
        </button>
        <button
          onClick={() => setItems(items.slice(0, -1))}
          disabled={items.length === 0}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            opacity: items.length === 0 ? 0.5 : 1
          }}
        >
          Remove Item
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          padding: '1rem',
          backgroundColor: '#fef2f2',
          border: '1px solid #ef4444',
          borderRadius: '4px'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#b91c1c' }}>Without useMemo</h4>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#b91c1c' }}>
            Result: {expensiveValueWithoutMemo.toLocaleString()}
          </p>
          <small style={{ color: '#6b7280' }}>Recalculates on every render</small>
        </div>

        <div style={{
          padding: '1rem',
          backgroundColor: '#f0f9ff',
          border: '1px solid #22c55e',
          borderRadius: '4px'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#166534' }}>With useMemo</h4>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#166534' }}>
            Result: {expensiveValueWithMemo.toLocaleString()}
          </p>
          <small style={{ color: '#6b7280' }}>Only recalculates when count changes</small>
        </div>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: '#eff6ff',
        border: '1px solid #3b82f6',
        borderRadius: '4px',
        marginBottom: '1rem'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>Simple Memoization</h4>
        <p style={{ margin: 0, color: '#1e40af' }}>
          Count × Multiplier = <strong>{multipliedValue}</strong>
        </p>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: '#f3f4f6',
        borderRadius: '4px'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Items (triggers re-renders):</h4>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          {items.join(', ')} ({items.length} items)
        </p>
        <small style={{ color: '#6b7280', display: 'block', marginTop: '0.5rem' }}>
          Open browser console to see when calculations run
        </small>
      </div>
    </div>
  )
}

const FilteredListDemo = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [items] = useState([
    { id: 1, name: 'Apple', category: 'Fruit', price: 1.2 },
    { id: 2, name: 'Banana', category: 'Fruit', price: 0.8 },
    { id: 3, name: 'Carrot', category: 'Vegetable', price: 0.5 },
    { id: 4, name: 'Broccoli', category: 'Vegetable', price: 2.1 },
    { id: 5, name: 'Orange', category: 'Fruit', price: 1.5 },
    { id: 6, name: 'Spinach', category: 'Vegetable', price: 1.8 },
    { id: 7, name: 'Grapes', category: 'Fruit', price: 3.2 },
    { id: 8, name: 'Potato', category: 'Vegetable', price: 0.6 }
  ])

  // Expensive filtering and sorting with useMemo
  const filteredAndSortedItems = useMemo(() => {
    console.log('🔄 Filtering and sorting items...')
    
    // Simulate expensive operation
    const startTime = performance.now()
    
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    const sorted = filtered.sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1
      return multiplier * (a.price - b.price)
    })
    
    const endTime = performance.now()
    console.log(`Filtering took ${endTime - startTime} milliseconds`)
    
    return sorted
  }, [items, searchTerm, sortOrder]) // Only recalculate when these values change

  // Statistics calculation with useMemo
  const statistics = useMemo(() => {
    console.log('📊 Calculating statistics...')
    
    const totalItems = filteredAndSortedItems.length
    const averagePrice = totalItems > 0 
      ? filteredAndSortedItems.reduce((sum, item) => sum + item.price, 0) / totalItems 
      : 0
    const categories = [...new Set(filteredAndSortedItems.map(item => item.category))]
    
    return {
      totalItems,
      averagePrice: averagePrice.toFixed(2),
      categories: categories.length
    }
  }, [filteredAndSortedItems])

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Filtered List with useMemo</h3>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}>
            Search:
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search items..."
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}>
            Sort by Price:
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        {filteredAndSortedItems.map(item => (
          <div
            key={item.id}
            style={{
              padding: '0.75rem',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '4px'
            }}
          >
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{item.name}</h4>
            <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
              {item.category}
            </p>
            <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: '#22c55e' }}>
              ${item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {filteredAndSortedItems.length === 0 && (
        <p style={{ textAlign: 'center', color: '#6b7280', fontStyle: 'italic', margin: '2rem 0' }}>
          No items match your search.
        </p>
      )}

      <div style={{
        padding: '1rem',
        backgroundColor: '#f0f9ff',
        border: '1px solid #3b82f6',
        borderRadius: '4px'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>Statistics (Memoized)</h4>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: '#1e40af' }}>
          <span><strong>Items:</strong> {statistics.totalItems}</span>
          <span><strong>Avg Price:</strong> ${statistics.averagePrice}</span>
          <span><strong>Categories:</strong> {statistics.categories}</span>
        </div>
        <small style={{ color: '#6b7280', display: 'block', marginTop: '0.5rem' }}>
          Open console to see when calculations run
        </small>
      </div>
    </div>
  )
}

const DependencyDemo = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('John')
  const [age, setAge] = useState(25)

  // Memoized value that depends on multiple values
  const userProfile = useMemo(() => {
    console.log('👤 Creating user profile object...')
    return {
      id: `user-${name.toLowerCase()}-${Date.now()}`,
      name,
      age,
      isAdult: age >= 18,
      description: `${name} is ${age} years old and is ${age >= 18 ? 'an adult' : 'a minor'}`
    }
  }, [name, age]) // Depends on name and age, NOT count

  // Memoized expensive operation
  const expensiveData = useMemo(() => {
    console.log('💰 Running expensive operation...')
    // Simulate expensive calculation
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += Math.random()
    }
    return {
      value: result.toFixed(2),
      timestamp: new Date().toLocaleTimeString()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, age]) // Depends on the primitive values instead of the object

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Dependency Array Behavior</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}>
            Count: {count}
          </label>
          <button
            onClick={() => setCount(c => c + 1)}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Increment Count
          </button>
          <small style={{ display: 'block', marginTop: '0.25rem', color: '#6b7280' }}>
            Won't trigger memoized calculations
          </small>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}>
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <small style={{ display: 'block', marginTop: '0.25rem', color: '#6b7280' }}>
            Will trigger profile recalculation
          </small>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}>
            Age: {age}
          </label>
          <input
            type="range"
            min="10"
            max="80"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <small style={{ display: 'block', marginTop: '0.25rem', color: '#6b7280' }}>
            Will trigger profile recalculation
          </small>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem' 
      }}>
        <div style={{
          padding: '1rem',
          backgroundColor: '#f0f9ff',
          border: '1px solid #3b82f6',
          borderRadius: '4px'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>User Profile (Memoized)</h4>
          <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#1e40af' }}>
            <strong>ID:</strong> {userProfile.id.substring(0, 20)}...
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#1e40af' }}>
            <strong>Status:</strong> {userProfile.isAdult ? '🔞 Adult' : '👶 Minor'}
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#1e40af' }}>
            {userProfile.description}
          </p>
        </div>

        <div style={{
          padding: '1rem',
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '4px'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#92400e' }}>Expensive Data (Memoized)</h4>
          <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#92400e' }}>
            <strong>Value:</strong> {expensiveData.value}
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#92400e' }}>
            <strong>Generated:</strong> {expensiveData.timestamp}
          </p>
          <small style={{ color: '#6b7280' }}>
            Only recalculates when user profile changes
          </small>
        </div>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: '#f3f4f6',
        borderRadius: '4px',
        marginTop: '1rem'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Current State:</h4>
        <p style={{ margin: 0, fontSize: '0.875rem', fontFamily: 'monospace' }}>
          count: {count}, name: "{name}", age: {age}
        </p>
        <small style={{ color: '#6b7280', display: 'block', marginTop: '0.5rem' }}>
          Open console to see which calculations run when you change values
        </small>
      </div>
    </div>
  )
}

const UseMemoHook: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">useMemo Hook</h1>
        <p className="page-description">
          Optimize expensive computations with the useMemo hook.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">What is useMemo?</h2>
        <p className="concept-description">
          <code>useMemo</code> is a React Hook that memoizes the result of a calculation between re-renders. 
          It only recalculates the memoized value when one of its dependencies changes. This is useful for 
          expensive calculations that you don't want to re-run on every render.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Basic useMemo Syntax</h2>
        <CodeBlock
          title="useMemo Basic Usage"
          code={`import { useMemo, useState } from 'react';

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // Without useMemo - runs on every render
  const expensiveValue = expensiveCalculation(count);

  // With useMemo - only runs when count changes
  const memoizedValue = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]); // Dependency array

  // Memoized derived state
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  return (
    <div>
      <p>Expensive value: {memoizedValue}</p>
      <p>Sorted items: {sortedItems.length}</p>
    </div>
  );
}

function expensiveCalculation(num) {
  console.log('Running expensive calculation...');
  let result = 0;
  for (let i = 0; i < num * 1000000; i++) {
    result += i;
  }
  return result;
}`}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Performance Optimization Example</h2>
        <p className="concept-description">
          Here's a comparison showing the performance benefits of useMemo for expensive calculations:
        </p>
        <CodeBlock
          title="Expensive Calculation with useMemo"
          code={`function PerformanceDemo() {
  const [count, setCount] = useState(1);
  const [items, setItems] = useState(['apple', 'banana']);

  // ❌ Without useMemo - runs on every render
  const expensiveValueBad = (() => {
    console.log('🔴 Expensive calculation running...');
    let result = 0;
    for (let i = 0; i < count * 1000000; i++) {
      result += i;
    }
    return result;
  })();

  // ✅ With useMemo - only runs when count changes
  const expensiveValueGood = useMemo(() => {
    console.log('🟢 Memoized calculation running...');
    let result = 0;
    for (let i = 0; i < count * 1000000; i++) {
      result += i;
    }
    return result;
  }, [count]);

  return (
    <div>
      <input 
        type="range" 
        min="1" 
        max="10" 
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <button onClick={() => setItems([...items, \`item-\${items.length}\`])}>
        Add Item (triggers re-render)
      </button>
      
      <div>
        <p>Without useMemo: {expensiveValueBad.toLocaleString()}</p>
        <p>With useMemo: {expensiveValueGood.toLocaleString()}</p>
      </div>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<ExpensiveCalculationDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Filtering and Sorting Lists</h2>
        <p className="concept-description">
          useMemo is particularly useful for expensive list operations like filtering and sorting:
        </p>
        <CodeBlock
          title="Memoized List Operations"
          code={`function FilteredList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [items] = useState([
    { id: 1, name: 'Apple', category: 'Fruit', price: 1.2 },
    { id: 2, name: 'Banana', category: 'Fruit', price: 0.8 },
    // ... more items
  ]);

  // Expensive filtering and sorting operation
  const filteredAndSortedItems = useMemo(() => {
    console.log('🔄 Filtering and sorting items...');
    
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      return multiplier * (a.price - b.price);
    });
  }, [items, searchTerm, sortOrder]); // Recalculate when any of these change

  // Statistics calculation also memoized
  const statistics = useMemo(() => {
    return {
      totalItems: filteredAndSortedItems.length,
      averagePrice: filteredAndSortedItems.reduce((sum, item) => sum + item.price, 0) / filteredAndSortedItems.length,
      categories: [...new Set(filteredAndSortedItems.map(item => item.category))].length
    };
  }, [filteredAndSortedItems]);

  return (
    <div>
      <input 
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search items..."
      />
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
      
      {filteredAndSortedItems.map(item => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>{item.category} - \${item.price}</p>
        </div>
      ))}
      
      <div>
        <p>Total: {statistics.totalItems} items</p>
        <p>Average price: \${statistics.averagePrice.toFixed(2)}</p>
      </div>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<FilteredListDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Dependency Array Behavior</h2>
        <p className="concept-description">
          Understanding how the dependency array works is crucial for effective useMemo usage:
        </p>
        <CodeBlock
          title="Dependency Array Examples"
          code={`function DependencyExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  const [age, setAge] = useState(25);

  // Depends on multiple values
  const userProfile = useMemo(() => {
    console.log('👤 Creating user profile...');
    return {
      id: \`user-\${name.toLowerCase()}\`,
      name,
      age,
      isAdult: age >= 18,
      description: \`\${name} is \${age} years old\`
    };
  }, [name, age]); // Only recalculates when name or age changes, NOT count

  // Depends on an object (be careful!)
  const expensiveComputation = useMemo(() => {
    console.log('💰 Running expensive computation...');
    // Some expensive operation based on user profile
    return performExpensiveCalculation(userProfile);
  }, [userProfile]); // Will run when userProfile object changes

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count} (won't trigger profile recalculation)
      </button>
      
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      
      <input 
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
      
      <div>
        <h4>Profile: {userProfile.description}</h4>
        <p>Expensive result: {expensiveComputation}</p>
      </div>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<DependencyDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">When to Use useMemo</h2>
        <div className="concept-description">
          <p><strong>Use useMemo when:</strong></p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li>You have expensive calculations that run on every render</li>
            <li>You're creating complex objects or arrays that other hooks depend on</li>
            <li>You're filtering, sorting, or transforming large datasets</li>
            <li>You're passing derived data to child components</li>
            <li>You want to prevent unnecessary re-renders of child components</li>
          </ul>
          
          <p style={{ marginTop: '1rem' }}><strong>Don't use useMemo when:</strong></p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li>The computation is simple and fast</li>
            <li>Dependencies change on every render anyway</li>
            <li>You're just trying to optimize prematurely</li>
            <li>The memoization overhead exceeds the computation cost</li>
          </ul>
        </div>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Best Practices</h2>
        <div className="concept-description">
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li><strong>Include All Dependencies:</strong> Add all values used inside useMemo to the dependency array</li>
            <li><strong>Use ESLint Plugin:</strong> Install react-hooks/exhaustive-deps for dependency checking</li>
            <li><strong>Measure Performance:</strong> Profile before and after to ensure useMemo actually helps</li>
            <li><strong>Stable References:</strong> Be careful with object dependencies that might change unexpectedly</li>
            <li><strong>Don't Overuse:</strong> Not every calculation needs memoization</li>
            <li><strong>Consider useCallback:</strong> For memoizing functions instead of values</li>
            <li><strong>Combine with React.memo:</strong> Use together to prevent unnecessary child re-renders</li>
          </ul>
        </div>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Common Patterns</h2>
        <CodeBlock
          title="useMemo Common Use Cases"
          code={`// 1. Expensive calculations
const fibonacci = useMemo(() => {
  return calculateFibonacci(n);
}, [n]);

// 2. Filtered/sorted lists
const filteredUsers = useMemo(() => {
  return users.filter(user => user.active).sort((a, b) => a.name.localeCompare(b.name));
}, [users]);

// 3. Creating objects for dependencies
const searchParams = useMemo(() => ({
  query: searchTerm,
  filters: activeFilters,
  page: currentPage
}), [searchTerm, activeFilters, currentPage]);

// 4. Transforming data
const chartData = useMemo(() => {
  return rawData.map(item => ({
    x: item.date,
    y: item.value,
    label: formatLabel(item.name)
  }));
}, [rawData]);

// 5. Complex derived state
const gameState = useMemo(() => {
  const score = calculateScore(moves);
  const isWinner = checkWinCondition(board);
  const availableMoves = getAvailableMoves(board);
  
  return { score, isWinner, availableMoves };
}, [moves, board]);

// 6. API parameters object
const apiParams = useMemo(() => ({
  endpoint: '/api/users',
  method: 'GET',
  params: { page, limit, search }
}), [page, limit, search]);`}
        />
      </div>
    </div>
  )
}

export default UseMemoHook
