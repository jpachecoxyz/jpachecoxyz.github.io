+++
title = "Pymetrics"
author = ["Javier Pacheco"]
description = "A GUI app written in python to store maintenace logs."
date = 2024-09-04T02:44:00-05:00
tags = ["linux", "tecnology", "wayland"]
draft = false
weight = 1
toc = true
+++

## Overview {#overview}

Managing and monitoring the performance of industrial machines is critical to ensuring minimal downtime and maximizing productivity. The need for an effective system to store and analyze maintenance data became apparent when the maintenance manager contacted me with a specific problem. They struggled to create KPI graphs because they lacked a proper system to store all the necessary data. To address this challenge, I developed a maintenance log app that efficiently tracks and records machine failures, repair time, shutdown time, and the technicians involved in the repairs. The data is stored in a CSV format, making it easy to create KPI (Key Performance Indicator) graphs in Excel for analysis.


## Features {#features}

Machine Failure Logging
: Record each instance of machine failure with timestamps.

Repair Time Tracking
: Log the start and end times of repairs to calculate the total repair duration.

Shutdown Time Monitoring
: Track the total time a machine is down due to failures and repairs.

Technician Assignment
: Assign technicians to specific repair tasks and log their involvement.


## How the Project Started {#how-the-project-started}

The project began when the maintenance manager reached out to me with a significant issue: they were unable to create KPI graphs due to the lack of a system for storing maintenance data. Understanding the importance of this data for monitoring machine performance, I developed the maintenance log app in Python to solve the problem. By providing a structured way to capture and store all relevant data, the app enables easy analysis and KPI generation.


## Benefits {#benefits}

The maintenance log app provides several key benefits:

-   **Enhanced Data Management:** All data is stored in a standardized CSV format, which can be easily imported into Excel for further analysis.
-   **Improved KPI Tracking**: By analyzing the recorded data, maintenance teams can generate KPI graphs in Excel to monitor performance metrics such as Mean Time to Repair (MTTR) and Mean Time Between Failures (MTBF).
-   **Informed Decision-Making:** The insights gained from the KPI graphs help in making informed decisions to improve machine reliability and reduce downtime.


## Technical Details {#technical-details}

The app is built using Python, leveraging its robust data handling capabilities. The CSV format is chosen for its simplicity and compatibility with various data analysis tools.


## Usage {#usage}

The application is designed to be user-friendly, requiring minimal input from the maintenance team. The data entry process is streamlined, allowing technicians to quickly log failures and repairs without interrupting their workflow.

<style>.org-center { margin-left: auto; margin-right: auto; text-align: center; }</style>

<div class="org-center">

{{< figure src="/images/posts/pymetrics/pymetrics.png" caption="<span class=\"figure-number\">Figure 1: </span>Pymetrics in light-mode." >}}

</div>


## How to Get Started {#how-to-get-started}

You can access the source code and instructions for setting up the maintenance log app on GitHub: [Pymetrics Repository](https://github.com/jpachecoxyz/pymetrics).


## Conclusion {#conclusion}

This maintenance log app is a practical tool for any industrial maintenance team looking to improve their machine monitoring and maintenance processes. By providing a clear view of machine performance through KPI graphs, it helps teams identify trends and make data-driven decisions. The app was born out of a real-world need, and I'm excited to see how it can help others in similar situations.

Feel free to explore the project and contribute to its development by visiting the [Pymetrics Repository](https://github.com/jpachecoxyz/pymetrics) on GitHub.
