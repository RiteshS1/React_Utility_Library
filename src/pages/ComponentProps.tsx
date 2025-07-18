import React from 'react'
import CodeBlock from '../components/CodeBlock'

// Demo Components
interface UserCardProps {
  name: string
  email: string
  age?: number
  isOnline: boolean
}

const UserCard: React.FC<UserCardProps> = ({ name, email, age, isOnline }) => (
  <div style={{ 
    padding: '1rem', 
    border: '2px solid #007acc', 
    borderRadius: '8px', 
    backgroundColor: isOnline ? '#f0f9ff' : '#f9fafb',
    maxWidth: '300px'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
      <div style={{ 
        width: '12px', 
        height: '12px', 
        borderRadius: '50%', 
        backgroundColor: isOnline ? '#22c55e' : '#ef4444' 
      }}></div>
      <h3 style={{ margin: 0, color: '#1f2937' }}>{name}</h3>
    </div>
    <p style={{ margin: '0.25rem 0', color: '#6b7280' }}>{email}</p>
    {age && <p style={{ margin: '0.25rem 0', color: '#6b7280' }}>Age: {age}</p>}
    <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', fontWeight: '600', color: isOnline ? '#22c55e' : '#ef4444' }}>
      {isOnline ? 'Online' : 'Offline'}
    </p>
  </div>
)

const UserCardDemo = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
    <UserCard 
      name="Alice Johnson" 
      email="alice@example.com" 
      age={28} 
      isOnline={true} 
    />
    <UserCard 
      name="Bob Smith" 
      email="bob@example.com" 
      isOnline={false} 
    />
    <UserCard 
      name="Carol Davis" 
      email="carol@example.com" 
      age={35} 
      isOnline={true} 
    />
  </div>
)

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled = false 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: '#007acc', color: 'white' }
      case 'secondary':
        return { backgroundColor: '#6b7280', color: 'white' }
      case 'danger':
        return { backgroundColor: '#ef4444', color: 'white' }
      default:
        return { backgroundColor: '#007acc', color: 'white' }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '0.25rem 0.5rem', fontSize: '0.875rem' }
      case 'medium':
        return { padding: '0.5rem 1rem', fontSize: '1rem' }
      case 'large':
        return { padding: '0.75rem 1.5rem', fontSize: '1.125rem' }
      default:
        return { padding: '0.5rem 1rem', fontSize: '1rem' }
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...getVariantStyles(),
        ...getSizeStyles(),
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        fontWeight: '600'
      }}
    >
      {children}
    </button>
  )
}

const ButtonDemo = () => {
  const [clickCount, setClickCount] = React.useState(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button variant="primary" onClick={() => setClickCount(c => c + 1)}>
          Primary
        </Button>
        <Button variant="secondary" onClick={() => setClickCount(c => c + 1)}>
          Secondary
        </Button>
        <Button variant="danger" onClick={() => setClickCount(c => c + 1)}>
          Danger
        </Button>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button size="small" onClick={() => setClickCount(c => c + 1)}>
          Small
        </Button>
        <Button size="medium" onClick={() => setClickCount(c => c + 1)}>
          Medium
        </Button>
        <Button size="large" onClick={() => setClickCount(c => c + 1)}>
          Large
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button onClick={() => setClickCount(c => c + 1)}>
          Enabled
        </Button>
        <Button disabled>
          Disabled
        </Button>
      </div>

      <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
        <p style={{ margin: 0 }}>Button clicked: <strong>{clickCount}</strong> times</p>
      </div>
    </div>
  )
}

const ComponentProps: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Components & Props</h1>
        <p className="page-description">
          Learn about React components, props, and component composition patterns.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">What are Components?</h2>
        <p className="concept-description">
          Components are the building blocks of React applications. They let you split the UI into 
          independent, reusable pieces, and think about each piece in isolation. Components can be 
          written as functions or classes, but functional components are preferred in modern React.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">What are Props?</h2>
        <p className="concept-description">
          Props (short for "properties") are how you pass data from parent components to child components. 
          Props are read-only and help make components reusable by allowing them to render different data.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Basic Component with Props</h2>
        <CodeBlock
          title="Simple Greeting Component"
          code={`// Define the component with props
function Greeting({ name, age }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      {age && <p>You are {age} years old.</p>}
    </div>
  );
}

// Using the component
function App() {
  return (
    <div>
      <Greeting name="Alice" age={25} />
      <Greeting name="Bob" />
    </div>
  );
}`}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">TypeScript Props Interface</h2>
        <p className="concept-description">
          Using TypeScript helps you define clear contracts for your component props:
        </p>
        <CodeBlock
          title="UserCard Component with TypeScript"
          code={`interface UserCardProps {
  name: string;           // Required prop
  email: string;          // Required prop
  age?: number;           // Optional prop
  isOnline: boolean;      // Required prop
}

const UserCard: React.FC<UserCardProps> = ({ name, email, age, isOnline }) => {
  return (
    <div className="user-card">
      <div className="status-indicator">
        <div className={\`status-dot \${isOnline ? 'online' : 'offline'}\`}></div>
        <h3>{name}</h3>
      </div>
      <p>{email}</p>
      {age && <p>Age: {age}</p>}
      <p className="status">{isOnline ? 'Online' : 'Offline'}</p>
    </div>
  );
};

// Usage
<UserCard 
  name="Alice Johnson" 
  email="alice@example.com" 
  age={28} 
  isOnline={true} 
/>`}
          showDemo={true}
          demoComponent={<UserCardDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Props with Default Values</h2>
        <p className="concept-description">
          You can provide default values for props using destructuring with default parameters:
        </p>
        <CodeBlock
          title="Button Component with Default Props"
          code={`interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',    // Default value
  size = 'medium',        // Default value
  onClick,
  disabled = false        // Default value
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary': return { backgroundColor: '#007acc', color: 'white' };
      case 'secondary': return { backgroundColor: '#6b7280', color: 'white' };
      case 'danger': return { backgroundColor: '#ef4444', color: 'white' };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small': return { padding: '0.25rem 0.5rem', fontSize: '0.875rem' };
      case 'medium': return { padding: '0.5rem 1rem', fontSize: '1rem' };
      case 'large': return { padding: '0.75rem 1.5rem', fontSize: '1.125rem' };
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...getVariantStyles(),
        ...getSizeStyles(),
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      {children}
    </button>
  );
};`}
          showDemo={true}
          demoComponent={<ButtonDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Children Prop</h2>
        <p className="concept-description">
          The <code>children</code> prop is special - it represents the content between the opening and closing tags:
        </p>
        <CodeBlock
          title="Container Component with Children"
          code={`interface ContainerProps {
  children: React.ReactNode;
  title?: string;
  highlight?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, title, highlight = false }) => {
  return (
    <div className={\`container \${highlight ? 'highlight' : ''}\`}>
      {title && <h3 className="container-title">{title}</h3>}
      <div className="container-content">
        {children}
      </div>
    </div>
  );
};

// Usage
<Container title="User Information" highlight={true}>
  <p>This content is passed as children</p>
  <Button>Click me</Button>
  <UserCard name="John" email="john@example.com" isOnline={true} />
</Container>`}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Component Composition</h2>
        <p className="concept-description">
          Instead of inheritance, React uses composition to build complex UIs from simpler components:
        </p>
        <CodeBlock
          title="Composition Pattern"
          code={`// Base Card component
const Card = ({ children, className = '' }) => (
  <div className={\`card \${className}\`}>
    {children}
  </div>
);

// Composed components
const CardHeader = ({ children }) => (
  <div className="card-header">{children}</div>
);

const CardBody = ({ children }) => (
  <div className="card-body">{children}</div>
);

const CardFooter = ({ children }) => (
  <div className="card-footer">{children}</div>
);

// Usage - compose complex UI from simple pieces
<Card className="user-profile">
  <CardHeader>
    <h2>User Profile</h2>
  </CardHeader>
  <CardBody>
    <UserCard name="Alice" email="alice@example.com" isOnline={true} />
  </CardBody>
  <CardFooter>
    <Button variant="primary">Edit Profile</Button>
    <Button variant="secondary">View Details</Button>
  </CardFooter>
</Card>`}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Best Practices</h2>
        <div className="concept-description">
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li><strong>Single Responsibility:</strong> Each component should have one clear purpose</li>
            <li><strong>Props Validation:</strong> Use TypeScript interfaces to define prop types</li>
            <li><strong>Default Values:</strong> Provide sensible defaults for optional props</li>
            <li><strong>Immutable Props:</strong> Never modify props directly - they are read-only</li>
            <li><strong>Descriptive Names:</strong> Use clear, descriptive names for props and components</li>
            <li><strong>Composition over Inheritance:</strong> Build complex UIs by composing simple components</li>
            <li><strong>Keep Components Small:</strong> Large components are harder to test and maintain</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ComponentProps
