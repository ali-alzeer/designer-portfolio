using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mk.data
{
    public class Utilities
    {
        public static string GetPublicIdFromCloudinaryUrl(string cloudinaryUrl)
        {
            if (string.IsNullOrEmpty(cloudinaryUrl))
            {
                return null;
            }

            // Parse the URL
            Uri uri = new Uri(cloudinaryUrl);

            // Extract the path and split it by '/'
            string[] pathSegments = uri.AbsolutePath.Split('/');

            // The public ID is typically the last segment
            string publicId = pathSegments.LastOrDefault();

            // Handle potential transformations or delivery information
            if (publicId.Contains('.'))
            {
                // Split the public ID and transformation/delivery part
                string[] parts = publicId.Split('.');
                publicId = parts[0];
            }

            return publicId;
        }
    }
}
