import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchActiveServices } from "@/features/services/serviceThunk";
import { fetchActiveCategories } from "@/features/categories/categoryThunk";
import HomeServiceCard from "@/components/HomeServiceCard";
import ScreenSkeleton from "@/components/common/ScreenSkeleton";
import ServicesFilter from "./ServicesFilter";

const Services = () => {
  const dispatch = useAppDispatch();
  const { activeServices, isLoading, error } = useAppSelector((state) => state.services);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Fetch active services and active categories on mount
  useEffect(() => {
    dispatch(fetchActiveServices());
    dispatch(fetchActiveCategories());
  }, [dispatch]);

  // Normalize and apply fallbacks to service data, then filter by category
  const services = useMemo(
    () => {
      const normalized = (activeServices || []).map((service) => {
        const category =
          service?.category && typeof service.category === "object"
            ? service.category
            : {
                id: "unknown",
                name:
                  typeof service?.category === "string"
                    ? service.category
                    : "General",
              };

        return {
          id: service.id,
          name: service.name || "Service",
          description: service.description || "Professional service",
          price: service.price || 0,
          duration: service.duration || "30 min",
          category,
          color: service.color || "#6C2A52",
          icon: service.icon || "cut-outline",
          image: service.image || "https://via.placeholder.com/300x200",
          popular: service.popular || false,
          isActive: service.isActive ?? true,
          createdAt: service.createdAt,
          updatedAt: service.updatedAt,
          publicId: service.publicId,
        };
      });

      // Filter by category if selected
      if (selectedCategoryId) {
        return normalized.filter(
          (service) => service.category?.id === selectedCategoryId
        );
      }

      return normalized;
    },
    [activeServices, selectedCategoryId]
  );

  const handleFilterChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const showEmpty = !isLoading && services.length === 0 && !error;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 lg:pt-28 pb-16 gradient-luxury text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Our Services Crafted for You
              {/* <span className="block mt-2 bg-clip-text">
                Crafted for You
              </span> */}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Explore our premium beauty services. Book directly from here and
              continue to the booking page to confirm your slot.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services Filter */}
          {!isLoading && activeServices.length > 0 && (
            <ServicesFilter onFilterChange={handleFilterChange} />
          )}

          {isLoading ? (
            <ScreenSkeleton
              layout="grid"
              showImage
              showTitle
              showDescription
              gridItems={3}
              className="space-y-6"
            />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Failed to load services.
              </p>
              <p className="text-sm text-muted-foreground/80">{error}</p>
            </div>
          ) : showEmpty ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No services are available right now.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, index) => (
                <HomeServiceCard
                  key={service.id || index}
                  service={service}
                  index={index}
                  origin="services"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
