import * as React from "react";
import { getSP } from "../pnpjsConfig";
import AwesomeSlider from "react-awesome-slider";
// import { mergeStyles } from "@fluentui/react";
import { useEffect, useState } from "react";
import "./NewsCarousel.css";

// const iconClass = mergeStyles({
//   fontSize: 12,
//   height: 12,
//   width: 12,
//   margin: "0 5px",
// });

export interface NewsCarouselProps {}

export const NewsCarousel = (props: NewsCarouselProps) => {
  //States
  const [items, setItems] = useState<any[]>([]);

  //Effects
  useEffect(() => {
    const getNewsPosts = async (): Promise<void> => {
      try {
        const sp = getSP();
        const items: any[] = await sp.web.lists
          .getByTitle("Site Pages")
          .items();
        console.log(items);
        setItems(items);
      } catch (err) {
        console.log(err);
      }
    };
    getNewsPosts();
  }, []);

  // background-image: url(&quot;https://sharepointsenpai.sharepoint.com/_layouts/15/images/sitepagethumbnail.png&quot;); background-size: cover;
  //If no items, show loading screen
  if (items.length === 0) {
    return <div>Loading...</div>;
  }

  const getImageUrl = (item: any) => {
    if (item.BannerImageUrl) {
      return `url('${item.BannerImageUrl.Url}')`;
    } else {
      return `url('https://sharepointsenpai.sharepoint.com/_layouts/15/images/sitepagethumbnail.png')`;
    }
  };

  console.log(items);

  //Filter out any items with Title == "Home"
  const updatedItems = items.filter((item) => {
    return item.Title !== "Home";
  });

  return (
    <>
      <AwesomeSlider
        // play={true}
        // cancelOnInteraction={false} // should stop playing on user interaction
        // interval={600}
        animation="openAnimation"
      >
        {updatedItems.map(function (item, i) {
          return (
            <div id="CarouselContainer">
              <div key={i} className="carousel-item">
                <div
                  className="carousel-image"
                  style={{
                    backgroundImage: getImageUrl(item),
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="contentContainer">
                  <div className="content">
                    {/* Title */}
                    <div className="title">{item.Title}</div>

                    {/* Description */}
                    <div className="description">{item.Description}</div>

                    {/* Created On */}
                    <div>
                      Published on:{" "}
                      {new Date(item.Created).toLocaleDateString()}
                    </div>

                    {/* Read More */}
                    <div className="button">
                      <a href="{location.href=newsart['url']}">Read more</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overlay"></div>
            </div>
          );
        })}
      </AwesomeSlider>
    </>
  );

  // //$('[data-index="1"]').click()
  //  return slider;

  return (
    <div>
      {items?.map((item: any) => {
        return (
          <div>
            {/* Title */}
            <div>{item.Title}</div>

            {/* Description */}
            <div>{item.Description}</div>

            {/* Show Date in format of "22/12/1987" */}
            <div> {new Date(item.Created).toLocaleDateString()}</div>

            {/* Banner Image */}
            <img src={item.BannerImageUrl?.Url} />
          </div>
        );
      })}
    </div>
  );
};
