import * as Icons from 'lucide-react'

function SafeIcon({ name, size = 24, className = '', ...props }) {
  const IconComponent = Icons[name] || Icons.HelpCircle
  
  return (
    <IconComponent 
      size={size} 
      className={className} 
      {...props} 
    />
  )
}

export default SafeIcon