import { Skeleton } from '@/components/ui/skeleton';

/**
 * Reusable skeleton loader component that can match any UI screen layout
 * @param {Object} props
 * @param {boolean} props.showImage - Show skeleton for image section
 * @param {boolean} props.showTitle - Show skeleton for title
 * @param {boolean} props.showDescription - Show skeleton for description
 * @param {boolean} props.showForm - Show skeleton for form fields
 * @param {number} props.formFields - Number of form field skeletons
 * @param {boolean} props.showGrid - Show skeleton for grid layout
 * @param {number} props.gridItems - Number of grid items
 * @param {string} props.layout - Layout type: 'default', 'split', 'grid'
 */
const ScreenSkeleton = (props) => {
  const {
    showImage = false,
    showTitle = true,
    showDescription = true,
    showForm = false,
    formFields = 3,
    showGrid = false,
    gridItems = 4,
    layout = 'default',
    className = '',
  } = props;
  // Split layout (like booking screen: image left, form right)
  if (layout === 'split') {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 ${className}`}>
        {/* Left: Image/Info Section */}
        <div className="space-y-4">
          {showImage && (
            <Skeleton className="w-full h-64 lg:h-[500px] rounded-2xl" />
          )}
          {showTitle && <Skeleton className="h-8 w-3/4" />}
          {showDescription && <Skeleton className="h-4 w-full" />}
          {showDescription && <Skeleton className="h-4 w-5/6" />}
        </div>

        {/* Right: Form Section */}
        <div className="space-y-6">
          {showTitle && <Skeleton className="h-8 w-2/3" />}
          {showDescription && <Skeleton className="h-4 w-full" />}
          
          {showForm && (
            <div className="space-y-4">
              {Array.from({ length: formFields }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          )}

          {showGrid && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: gridItems }).map((_, index) => (
                <Skeleton key={index} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Grid layout
  if (layout === 'grid') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: gridItems }).map((_, index) => (
          <div key={index} className="space-y-4">
            {showImage && <Skeleton className="w-full h-48 rounded-xl" />}
            {showTitle && <Skeleton className="h-6 w-3/4" />}
            {showDescription && <Skeleton className="h-4 w-full" />}
            {showDescription && <Skeleton className="h-4 w-5/6" />}
          </div>
        ))}
      </div>
    );
  }

  // Default layout
  return (
    <div className={`space-y-6 ${className}`}>
      {showImage && <Skeleton className="w-full h-64 rounded-2xl" />}
      
      {showTitle && <Skeleton className="h-8 w-2/3" />}
      
      {showDescription && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      )}

      {showForm && (
        <div className="space-y-4">
          {Array.from({ length: formFields }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      )}

      {showGrid && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: gridItems }).map((_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScreenSkeleton;

